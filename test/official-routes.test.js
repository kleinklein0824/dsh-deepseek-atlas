import assert from 'node:assert/strict';
import fs, { mkdir, mkdtemp, readFile, rmdir, unlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { apply } from '../index.js';
import { createOfficialSync } from '../lib/official.js';

const snapshotPath = '/api/dsh-deepseek-atlas/official.json';
const refreshPath = '/api/dsh-deepseek-atlas/refresh';

function mount(services) {
  const cleanups = [];
  const scope = {
    ...services,
    inject(names, setup) { if (names.every((name) => name in services)) setup(scope); },
    effect(setup) { cleanups.push(setup()); },
  };
  apply(scope);
  return async () => {
    for (const cleanup of cleanups.splice(0).reverse()) await cleanup?.();
  };
}

for (const [name, services] of [['no connection service', {}], ['no fetch registry', { connection: {} }]]) {
  test(`offline host with ${name} registers no routes`, async () => {
    const dispose = mount({ ...services, webServer: { register() { assert.fail('registered a raw HTTP route'); } } });
    await dispose();
  });
}

async function cachedHome(t) {
  const home = await mkdtemp(path.join(os.tmpdir(), 'dsh-atlas-test-'));
  const dir = path.join(home, 'deepseek-atlas');
  const file = path.join(dir, 'official.json');
  const seed = { schema: 1, source: 'official', models: [{ id: 'fixture-model' }],
    checkedAt: new Date().toISOString(), etag: '"fixture"', stale: false };
  await mkdir(dir);
  await writeFile(file, JSON.stringify(seed));
  t.after(async () => { await unlink(file); await rmdir(dir); await rmdir(home); });
  return { home, dir, file, seed };
}

test('connection routes read the cache, revalidate on refresh, and enforce a 15-second cooldown', async (t) => {
  const { home, file, seed } = await cachedHome(t);
  const oldHome = process.env.DSH_HOME;
  process.env.DSH_HOME = home;
  t.after(() => { if (oldHome === undefined) delete process.env.DSH_HOME; else process.env.DSH_HOME = oldHome; });
  const upstream = t.mock.method(globalThis, 'fetch', () => Promise.resolve(new Response(null, { status: 304 })));
  const routes = new Map();
  const dispose = mount({ connection: { fetch: { register(route) {
    assert.ok(!routes.has(route.path));
    routes.set(route.path, route);
    return async () => { routes.delete(route.path); };
  } } } });
  t.after(dispose);
  assert.deepEqual([...routes.keys()].sort(), [snapshotPath, refreshPath]);
  const get = routes.get(snapshotPath);
  const post = routes.get(refreshPath);
  assert.deepEqual(get.methods, ['GET']);
  assert.deepEqual(post.methods, ['POST']);
  assert.equal(get.requestBody, 'buffered');
  assert.equal(post.requestBody, 'buffered');

  const snapshot = await get.fetch(new Request(`https://host.invalid${snapshotPath}`));
  assert.equal(snapshot.status, 200);
  assert.match(snapshot.headers.get('content-type'), /application\/json/);
  assert.equal(snapshot.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await snapshot.json(), seed);
  assert.equal(upstream.mock.callCount(), 0);

  let now = Date.now();
  t.mock.method(Date, 'now', () => now);
  async function refresh() {
    const reply = await post.fetch(new Request(`https://host.invalid${refreshPath}`, { method: 'POST' }));
    assert.equal(reply.status, 200);
    return reply.json();
  }
  const first = await refresh();
  assert.deepEqual(first.models, seed.models);
  assert.deepEqual(JSON.parse(await readFile(file, 'utf8')), first);
  assert.equal(upstream.mock.callCount(), 1);
  assert.equal(upstream.mock.calls[0].arguments[1].headers['if-none-match'], seed.etag);
  now += 14999;
  assert.equal((await refresh()).cooldownMs, 1);
  assert.equal(upstream.mock.callCount(), 1);
  now += 1;
  assert.equal((await refresh()).cooldownMs, undefined);
  assert.equal(upstream.mock.callCount(), 2);

  await dispose();
  assert.equal(routes.size, 0);
});

test('unloading during startup does not leave a background sync timer', async (t) => {
  const { dir } = await cachedHome(t);
  const sync = createOfficialSync({ dataDir: dir });
  const timer = t.mock.method(globalThis, 'setInterval', () => ({ unref() {} }));
  const starting = sync.start();
  sync.stop();
  await starting;
  assert.equal(timer.mock.callCount(), 0);
});

test('startup, first snapshot and immediate refresh share one initial cache read', async (t) => {
  const { dir, file } = await cachedHome(t);
  const read = fs.readFile.bind(fs);
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  const reads = t.mock.method(fs, 'readFile', async (...args) => { await gate; return read(...args); });
  const sync = createOfficialSync({ dataDir: dir, fetchImpl: async () => new Response(null, { status: 304 }) });
  t.after(() => sync.stop());

  const start = sync.start();
  const opening = sync.ensure();
  const refreshing = sync.refresh(true);
  const initialReads = reads.mock.callCount();
  release();
  const [, , refreshed] = await Promise.all([start, opening, refreshing]);

  assert.equal(initialReads, 1);
  assert.deepEqual(sync.snapshot(), refreshed);
  assert.deepEqual(JSON.parse(await read(file, 'utf8')), refreshed);
});
