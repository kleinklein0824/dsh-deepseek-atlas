import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

export const OFFICIAL_SOURCE_URL = 'https://api-docs.deepseek.com/quick_start/pricing.md';
export const OFFICIAL_PAGE_URL = 'https://api-docs.deepseek.com/quick_start/pricing';
export const OFFICIAL_SCHEMA = 1;

function splitRow(line) {
  return String(line).trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
}

function cleanCell(value) {
  return String(value == null ? '' : value)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<((?:https?|mailto):[^>]+)>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripFootnote(value) {
  return cleanCell(value).replace(/\s*\(\d+\)\s*$/, '').trim();
}

function money(value) {
  const found = /([0-9]+(?:\.[0-9]+)?)/.exec(cleanCell(value));
  return found ? Number(found[1]) : null;
}

function featureKey(label) {
  const text = cleanCell(label).toLowerCase();
  if (text.startsWith('json output')) return 'json';
  if (text.startsWith('tool calls')) return 'tools';
  if (text.startsWith('responses api')) return 'responses';
  if (text.startsWith('anthropic api')) return 'anthropic';
  if (text.startsWith('chat prefix completion')) return 'prefix';
  if (text.startsWith('fim completion')) return 'fim';
  if (text.startsWith('vision')) return 'vision';
  return '';
}

function pricingKey(label) {
  const text = cleanCell(label).toUpperCase();
  if (text.includes('CACHE HIT')) return 'cacheHit';
  if (text.includes('CACHE MISS')) return 'cacheMiss';
  if (text.includes('OUTPUT')) return 'output';
  return '';
}

function versionHint(version) {
  const found = /-(\d{2})(\d{2})$/.exec(String(version || ''));
  if (!found) return null;
  const month = Number(found[1]);
  const day = Number(found[2]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { month, day };
}

/**
 * Parse the public pricing Markdown page. The page is a docs table, not a JSON
 * API, so parsing is deliberately narrow and fails loudly when the shape moves.
 */
export function parsePricingMarkdown(markdown) {
  const lines = String(markdown || '').split(/\r?\n/);
  let headerIndex = -1;
  let headerCells = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line.startsWith('|')) continue;
    const cells = splitRow(line);
    if (cells.length < 5) continue;
    if (cleanCell(cells[0]).toUpperCase() !== 'MODEL') continue;
    if (!cells.slice(3).some((cell) => /deepseek-/i.test(cell))) continue;
    headerIndex = index;
    headerCells = cells;
    break;
  }

  if (headerIndex < 0 || !headerCells) throw new Error('官方页面未找到模型表头');

  const modelIds = headerCells.slice(3).map(stripFootnote).filter(Boolean);
  if (!modelIds.length) throw new Error('官方模型表头为空');

  const models = modelIds.map((id) => ({
    id,
    version: '',
    context: '',
    maxOutput: '',
    thinking: '',
    features: {
      json: false,
      tools: false,
      responses: false,
      anthropic: false,
      prefix: false,
      fim: '',
      vision: false,
    },
    pricing: {
      cacheHit: { offPeak: null, peak: null },
      cacheMiss: { offPeak: null, peak: null },
      output: { offPeak: null, peak: null },
    },
    concurrency: null,
    baseUrls: { openai: '', anthropic: '' },
    aliases: id === 'deepseek-flash' ? ['deepseek-v4-flash', 'deepseek-v4-flash-vision-exp'] : [],
  }));

  for (let index = headerIndex + 1; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line.startsWith('|')) break;
    const cells = splitRow(line);
    if (cells.length < 3 + modelIds.length) continue;
    if (cells.every((cell) => /^:?-{3,}:?$/.test(cell.replace(/\s/g, '')))) continue;

    const label = cleanCell(cells[0]).toUpperCase();
    const sub = cleanCell(cells[1]);
    const sub2 = cleanCell(cells[2]);
    const values = cells.slice(3, 3 + modelIds.length);

    for (let modelIndex = 0; modelIndex < models.length; modelIndex += 1) {
      const model = models[modelIndex];
      const value = cleanCell(values[modelIndex]);

      if (label === 'MODEL VERSION') {
        model.version = value;
        model.releaseHint = versionHint(value);
      } else if (label === 'THINKING MODE') {
        model.thinking = value;
      } else if (label === 'CONTEXT LENGTH') {
        model.context = value;
      } else if (label === 'MAX OUTPUT') {
        model.maxOutput = value.replace(/^MAXIMUM:\s*/i, '').trim();
      } else if (label === 'FEATURES') {
        const key = featureKey(sub);
        if (key === 'fim') model.features.fim = value;
        else if (key === 'vision') model.features.vision = /^✓|^yes$/i.test(value);
        else if (key) model.features[key] = /^✓|^yes$/i.test(value);
      } else if (label.startsWith('PRICING')) {
        const key = pricingKey(sub);
        if (!key) continue;
        const period = /PEAK/i.test(sub2) && !/OFF-PEAK/i.test(sub2) ? 'peak' : 'offPeak';
        model.pricing[key][period] = money(value);
      } else if (label.startsWith('CONCURRENCY LIMIT')) {
        const number = Number(value.replace(/[^0-9.]/g, ''));
        model.concurrency = Number.isFinite(number) ? number : null;
      } else if (label === 'BASE URL (OPENAI FORMAT)') {
        model.baseUrls.openai = value;
      } else if (label === 'BASE URL (ANTHROPIC FORMAT)') {
        model.baseUrls.anthropic = value;
      }
    }
  }

  for (const model of models) {
    if (!model.version) throw new Error(`${model.id} 缺少 MODEL VERSION`);
    if (!model.context) throw new Error(`${model.id} 缺少 CONTEXT LENGTH`);
    const prices = [model.pricing.cacheHit.offPeak, model.pricing.cacheHit.peak,
      model.pricing.cacheMiss.offPeak, model.pricing.cacheMiss.peak,
      model.pricing.output.offPeak, model.pricing.output.peak];
    if (prices.some((price) => price === null)) throw new Error(`${model.id} 价格表不完整`);
  }

  models.sort((left, right) => left.id.localeCompare(right.id));
  return {
    models,
    sourceUrl: OFFICIAL_SOURCE_URL,
    pageUrl: OFFICIAL_PAGE_URL,
    parsedAt: new Date().toISOString(),
  };
}

function errorText(error) {
  return String((error && error.message) || error || 'unknown sync error').slice(0, 300);
}

/**
 * Last-known-good snapshot store with ETag revalidation and atomic persistence.
 * No API key and no model call is made; only the public pricing Markdown is read.
 */
export function createOfficialSync(options = {}) {
  const dataDir = options.dataDir || path.join(process.cwd(), '.dsh-deepseek-atlas');
  const cachePath = path.join(dataDir, 'official.json');
  const intervalMs = Number(options.intervalMs) > 0 ? Number(options.intervalMs) : 6 * 60 * 60 * 1000;
  const fetchImpl = options.fetchImpl || fetch;
  const logger = options.logger || console;
  let current = null;
  let loading = null;
  let inFlight = null;
  let timer = null;
  let started = false;
  let lastRefreshAt = 0;

  function load() {
    if (current) return Promise.resolve(current);
    // Startup and the first request must not race to replace the in-memory snapshot.
    loading ??= readCache().finally(() => { loading = null; });
    return loading;
  }

  async function readCache() {
    try {
      const raw = await fs.readFile(cachePath, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.models) && parsed.models.length) current = parsed;
    } catch (error) {
      if (error && error.code !== 'ENOENT') logger.warn('[deepseek-atlas] cache unreadable:', errorText(error));
    }
    return current;
  }

  async function persist(snapshot) {
    await fs.mkdir(dataDir, { recursive: true });
    const temporary = `${cachePath}.${process.pid}.tmp`;
    await fs.writeFile(temporary, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
    await fs.rename(temporary, cachePath);
  }

  async function fail(error) {
    const checkedAt = new Date().toISOString();
    const message = errorText(error);
    if (current) {
      current.checkedAt = checkedAt;
      current.stale = true;
      current.error = message;
      try { await persist(current); } catch (saveError) { logger.warn('[deepseek-atlas] cache save failed:', errorText(saveError)); }
      return current;
    }
    current = {
      schema: OFFICIAL_SCHEMA,
      source: 'offline',
      sourceUrl: OFFICIAL_SOURCE_URL,
      pageUrl: OFFICIAL_PAGE_URL,
      fetchedAt: null,
      checkedAt,
      stale: true,
      error: message,
      models: [],
    };
    return current;
  }

  async function doRefresh(force) {
    lastRefreshAt = Date.now();
    if (!current) await load();
    const checkedAt = current && current.checkedAt ? Date.parse(current.checkedAt) : 0;
    if (!force && current && checkedAt && Date.now() - checkedAt < intervalMs) return current;

    const headers = {
      accept: 'text/markdown, text/plain;q=0.9, */*;q=0.8',
      'user-agent': 'dsh-deepseek-atlas/1.0 (+local DSH plugin)',
    };
    if (current && current.etag) headers['if-none-match'] = current.etag;
    if (current && current.lastModified) headers['if-modified-since'] = current.lastModified;

    let response;
    try {
      response = await fetchImpl(OFFICIAL_SOURCE_URL, {
        method: 'GET',
        headers,
        redirect: 'follow',
        signal: AbortSignal.timeout(15000),
      });
    } catch (error) {
      return fail(error);
    }

    if (response.status === 304 && current) {
      current.checkedAt = new Date().toISOString();
      current.stale = false;
      current.error = null;
      try { await persist(current); } catch (error) { logger.warn('[deepseek-atlas] cache save failed:', errorText(error)); }
      return current;
    }

    if (!response.ok) return fail(new Error(`HTTP ${response.status}`));

    let parsed;
    try {
      parsed = parsePricingMarkdown(await response.text());
    } catch (error) {
      return fail(error);
    }

    const hash = crypto.createHash('sha256').update(JSON.stringify(parsed.models)).digest('hex');
    const now = new Date().toISOString();
    const snapshot = {
      schema: OFFICIAL_SCHEMA,
      source: 'official',
      sourceUrl: OFFICIAL_SOURCE_URL,
      pageUrl: OFFICIAL_PAGE_URL,
      fetchedAt: current && current.hash === hash && current.fetchedAt ? current.fetchedAt : now,
      checkedAt: now,
      stale: false,
      error: null,
      etag: response.headers.get('etag') || null,
      lastModified: response.headers.get('last-modified') || null,
      hash,
      models: parsed.models,
    };
    current = snapshot;
    try { await persist(snapshot); } catch (error) { logger.warn('[deepseek-atlas] cache save failed:', errorText(error)); }
    logger.log(`[deepseek-atlas] official sync ok: ${snapshot.models.map((model) => model.id).join(', ')}`);
    return snapshot;
  }

  function refresh(force = false) {
    if (inFlight) return inFlight;
    inFlight = doRefresh(Boolean(force)).catch((error) => fail(error)).finally(() => { inFlight = null; });
    return inFlight;
  }

  async function ensure() {
    if (current) return current;
    await load();
    if (current) return current;
    return refresh(true);
  }

  async function start() {
    if (started) return ensure();
    started = true;
    await load();
    if (!started) return current;
    const checkedAt = current && current.checkedAt ? Date.parse(current.checkedAt) : 0;
    if (!checkedAt || Date.now() - checkedAt >= intervalMs) void refresh(false);
    else logger.log('[deepseek-atlas] official cache is fresh');
    timer = setInterval(() => { void refresh(false); }, intervalMs);
    if (typeof timer.unref === 'function') timer.unref();
    return current;
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
    started = false;
  }

  return {
    cachePath,
    start,
    stop,
    refresh,
    ensure,
    snapshot: () => current,
    lastRefreshAt: () => lastRefreshAt,
    intervalMs,
  };
}
