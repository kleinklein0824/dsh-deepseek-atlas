import os from 'node:os';
import path from 'node:path';
import { createOfficialSync } from './lib/official.js';

const SNAPSHOT_ROUTE = '/dsh-deepseek-atlas/official.json';
const REFRESH_ROUTE = '/dsh-deepseek-atlas/refresh';
const REFRESH_COOLDOWN_MS = 15000;

function sendJson(res, status, body) {
  try {
    const payload = JSON.stringify(body);
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Length': Buffer.byteLength(payload),
    });
    res.end(payload);
  } catch (error) {
    try { res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('sync response failed'); } catch (ignored) {}
  }
}

export function apply(ctx) {
  const disposers = [];
  let sync = null;

  const setup = (webServer) => {
    if (!webServer || typeof webServer.register !== 'function') return;
    const home = process.env.DSH_HOME || path.join(os.homedir(), '.dsh');
    sync = createOfficialSync({ dataDir: path.join(home, 'deepseek-atlas') });

    const register = (route) => {
      const dispose = webServer.register(route);
      if (typeof dispose === 'function') disposers.push(dispose);
    };

    register({
      kind: 'exact',
      path: SNAPSHOT_ROUTE,
      handler: async (req, res) => {
        if (String(req.method || 'GET').toUpperCase() !== 'GET') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' });
          return;
        }
        try {
          const snapshot = await sync.ensure();
          sendJson(res, 200, snapshot);
        } catch (error) {
          sendJson(res, 502, { ok: false, error: String((error && error.message) || error).slice(0, 300) });
        }
      },
    });

    register({
      kind: 'exact',
      path: REFRESH_ROUTE,
      handler: async (req, res) => {
        if (String(req.method || 'GET').toUpperCase() !== 'POST') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' });
          return;
        }
        if (Date.now() - sync.lastRefreshAt() < REFRESH_COOLDOWN_MS) {
          try {
            const snapshot = sync.snapshot() || await sync.ensure();
            sendJson(res, 200, {
              ...(snapshot || {}),
              cooldownMs: Math.max(0, REFRESH_COOLDOWN_MS - (Date.now() - sync.lastRefreshAt())),
            });
          } catch (error) {
            sendJson(res, 502, { ok: false, error: String((error && error.message) || error).slice(0, 300) });
          }
          return;
        }
        try {
          const snapshot = await sync.refresh(true);
          sendJson(res, 200, snapshot);
        } catch (error) {
          sendJson(res, 502, { ok: false, error: String((error && error.message) || error).slice(0, 300) });
        }
      },
    });

    void sync.start().catch((error) => {
      console.warn('[deepseek-atlas] official sync start failed:', String((error && error.message) || error));
    });
  };

  // Cordis 要求服务必须通过 inject 读取；直接访问 ctx.webServer 会让插件 fiber 失败。
  if (typeof ctx.inject === 'function') {
    ctx.inject(['webServer'], (hostContext) => {
      setup(hostContext && hostContext.webServer);
    });
  }

  if (typeof ctx.effect === 'function') {
    ctx.effect(() => () => {
      if (sync) sync.stop();
      for (const dispose of disposers) {
        try { dispose(); } catch (error) {}
      }
    });
  }
}
