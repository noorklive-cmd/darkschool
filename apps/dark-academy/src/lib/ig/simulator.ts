import { z } from 'zod';

export const trigger = z.enum(['AGENTE', 'PADRAO', 'DARK']);
export const eventSchema = z.object({
  eventId: z.string().uuid(),
  contactId: z.string().regex(/^sim-[A-Za-z0-9_-]{1,60}$/),
  trigger
}).strict();
export type FunnelEvent = z.infer<typeof eventSchema>;
export interface IGProvider { parse(input: unknown): FunnelEvent }
export const simulator: IGProvider = { parse: input => eventSchema.parse(input) };
