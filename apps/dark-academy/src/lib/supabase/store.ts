import type { FunnelEvent } from '../ig/simulator.ts';

export type Receipt = 'created' | 'existing' | 'conflict';
export type Status = 'completed' | 'awaiting_approval' | 'failed';
export interface Attempt {
  eventId: string; agent: string; status: Status; durationMs: number; costEstimate: 0;
}
export interface Store {
  receive(event: FunnelEvent): Promise<Receipt>;
  hasReply(eventId: string): Promise<boolean>;
  reply(eventId: string, body: string): Promise<boolean>;
  log(attempt: Attempt): Promise<void>;
}
export class MemoryStore implements Store {
  readonly leads = new Set<string>();
  readonly inbound = new Map<string, FunnelEvent>();
  readonly outbound = new Map<string, string>();
  readonly logs: Attempt[] = [];
  readonly approvals: { logIndex: number; status: 'pending' }[] = [];

  async receive(event: FunnelEvent): Promise<Receipt> {
    const old = this.inbound.get(event.eventId);
    if (old) return old.contactId === event.contactId && old.trigger === event.trigger ? 'existing' : 'conflict';
    this.leads.add(event.contactId);
    this.inbound.set(event.eventId, {...event});
    return 'created';
  }
  async hasReply(id: string) { return this.outbound.has(id); }
  async reply(id: string, body: string) {
    if (!this.inbound.has(id)) throw new Error('Evento ausente');
    if (this.outbound.has(id)) return false;
    this.outbound.set(id, body);
    return true;
  }
  async log(attempt: Attempt) {
    const index = this.logs.push({...attempt}) - 1;
    if (attempt.status === 'awaiting_approval') this.approvals.push({logIndex: index, status: 'pending'});
  }
}
