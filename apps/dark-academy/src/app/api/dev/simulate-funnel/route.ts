import { makeHandler } from '../../../../lib/funnel/handler.ts';
import { makeRuntime } from '../../../../lib/funnel/runtime.ts';
let runtime: ReturnType<typeof makeRuntime>;
export const POST = makeHandler(process.env.NODE_ENV, () => runtime ??= makeRuntime(process.env));
