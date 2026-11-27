import type { FunnelEvent } from '../ig/simulator.ts';
import type { Store, Receipt } from '../supabase/store.ts';

export interface WhatsAppProvider {
  receive(event: FunnelEvent): Promise<Receipt>;
  send(eventId: string, body: string): Promise<boolean>;
}
export function mockWhatsApp(store: Store, print: (line: string) => void = console.info): WhatsAppProvider {
  return {
    async receive(event) {
      const result = await store.receive(event);
      if (result === 'created') print('[mock:in] ' + event.eventId + ' ' + event.trigger);
      return result;
    },
    async send(id, body) {
      const created = await store.reply(id, body);
      if (created) print('[mock:out] ' + id + ' ' + body);
      return created;
    }
  };
}
