import { z } from 'zod';
import type { AIProvider } from '../lib/ai/index.ts';
import type { WhatsAppProvider } from '../lib/whatsapp/index.ts';
export type Squad = 'aquisicao' | 'conteudo' | 'engenharia' | 'ops';
export interface Services { ai: AIProvider; whatsapp: WhatsAppProvider }
export interface AgentContext<I> extends Services { input: I; correlationId: string }
export interface Agent<I,O> {
  id: string; squad: Squad; inputSchema: z.ZodType<I>; outputSchema: z.ZodType<O>;
  run(ctx: AgentContext<I>): Promise<O>;
}
export const reviewInput = z.object({brief: z.string().trim().min(1).max(4000)}).strict();
export const reviewOutput = z.object({status: z.literal('awaiting_approval')}).strict();
export async function requestReview(_ctx: AgentContext<z.infer<typeof reviewInput>>) {
  return {status: 'awaiting_approval' as const};
}
