import { z } from 'zod';

const envSchema = z.object({
  AI_PROVIDER: z.literal('gemini_free').default('gemini_free'),
  AI_MODE: z.literal('fixture').default('fixture'),
  WHATSAPP_PROVIDER: z.literal('mock').default('mock'),
  IG_TRIGGER_MODE: z.literal('simulator').default('simulator'),
  REDIS_DRIVER: z.enum(['memory', 'upstash']).default('memory'),
  STORE_DRIVER: z.enum(['memory', 'supabase']).default('memory'),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional()
}).superRefine((v, ctx) => {
  if (v.STORE_DRIVER === 'supabase' && (!v.SUPABASE_SERVICE_ROLE_KEY ||
    !['127.0.0.1','localhost'].includes(new URL(v.SUPABASE_URL || 'http://missing').hostname))) {
    ctx.addIssue({code: 'custom', message: 'Use o Supabase local e sua chave de servidor.'});
  }
  if (v.REDIS_DRIVER === 'upstash' && (!v.UPSTASH_REDIS_REST_URL?.startsWith('https://') || !v.UPSTASH_REDIS_REST_TOKEN)) {
    ctx.addIssue({code: 'custom', message: 'Configure o endpoint HTTPS e o token Redis.'});
  }
});
export const readEnv = (source: NodeJS.ProcessEnv) => envSchema.parse(source);
