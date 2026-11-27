import { readEnv } from '../env.ts';
import { geminiFixture } from '../ai/index.ts';
import { memoryCache, upstashCache } from '../redis/index.ts';
import { mockWhatsApp } from '../whatsapp/index.ts';
import { MemoryStore } from '../supabase/store.ts';
import { supabaseStore } from '../supabase/server.ts';
import type { Runtime } from './simulate.ts';

export function makeRuntime(env: NodeJS.ProcessEnv): Runtime {
  const cfg = readEnv(env);
  const store = cfg.STORE_DRIVER === 'memory' ? new MemoryStore() :
    supabaseStore(cfg.SUPABASE_URL!,cfg.SUPABASE_SERVICE_ROLE_KEY!);
  const cache = cfg.REDIS_DRIVER === 'memory' ? memoryCache() :
    upstashCache(cfg.UPSTASH_REDIS_REST_URL!,cfg.UPSTASH_REDIS_REST_TOKEN!);
  return {store, cache, ai:geminiFixture, whatsapp:mockWhatsApp(store)};
}
