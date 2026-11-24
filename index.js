import os from 'node:os';
import path from 'node:path';
import { createOfficialSync } from './lib/official.js';

const SNAPSHOT_ROUTE = '/api/dsh-deepseek-atlas/official.json';
const REFRESH_ROUTE = '/api/dsh-deepseek-atlas/refresh';
const REFRESH_COOLDOWN_MS = 15000;

export function apply(ctx) {
  if (typeof ctx.inject !== 'function') return;
  ctx.inject(['connection'], (scope) => {
    const registry = scope.connection?.fetch;
    // Older hosts keep the client archive, but must not expose either route.
    if (typeof registry?.register !== 'function') return;
    const home = process.env.DSH_HOME || path.join(os.homedir(), '.dsh');
    const sync = createOfficialSync({ dataDir: path.join(home, 'deepseek-atlas') });

    const register = (route, method, read) => scope.effect(() => registry.register({
      path: route,
      methods: [method],
      requestBody: 'buffered',
      async fetch() {
        const headers = { 'Cache-Control': 'no-store' };
        try {
          return Response.json(await read(), { headers });
        } catch (error) {
          return Response.json({ ok: false, error: String(error?.message || error).slice(0, 300) }, { status: 502, headers });
        }
      },
    }));

    register(SNAPSHOT_ROUTE, 'GET', sync.ensure);
    register(REFRESH_ROUTE, 'POST', async () => {
      if (Date.now() - sync.lastRefreshAt() >= REFRESH_COOLDOWN_MS) return sync.refresh(true);
      const snapshot = sync.snapshot() || await sync.ensure();
      return { ...snapshot, cooldownMs: Math.max(0, REFRESH_COOLDOWN_MS - (Date.now() - sync.lastRefreshAt())) };
    });

    scope.effect(() => {
      void sync.start().catch((error) => {
        console.warn('[deepseek-atlas] official sync start failed:', String(error?.message || error));
      });
      return () => sync.stop();
    });
  });
}
