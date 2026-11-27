export interface SessionCache {
  claim(key: string, owner: string, ttlSeconds: number): Promise<boolean>;
  release(key: string, owner: string): Promise<void>;
  set(key: string, value: string, ttlSeconds: number): Promise<void>;
  get(key: string): Promise<string | null>;
}

export function memoryCache(now = Date.now): SessionCache {
  const entries = new Map<string, {value:string; expires:number}>();
  function lookup(key: string) {
    const entry = entries.get(key);
    if (entry && entry.expires > now()) return entry.value;
    entries.delete(key);
    return null;
  }
  return {
    async get(key) { return lookup(key); },
    async set(key,value,ttl) { entries.set(key, {value, expires:now() + ttl * 1000}); },
    async claim(key,owner,ttl) {
      if (lookup(key) !== null) return false;
      entries.set(key, {value:owner, expires:now() + ttl * 1000});
      return true;
    },
    async release(key,owner) { if (lookup(key) === owner) entries.delete(key); }
  };
}

export function upstashCache(url: string, token: string): SessionCache {
  async function command(...args: (string | number)[]) {
    const res = await fetch(url, {method:'POST', headers:{Authorization:'Bearer ' + token, 'Content-Type':'application/json'},
      body:JSON.stringify(args), cache:'no-store'});
    if (!res.ok) throw new Error('Redis indisponível');
    const reply = await res.json();
    if (reply.error) throw new Error('Comando Redis recusado');
    return reply.result;
  }
  return {
    async get(key) { return await command('GET',key) as string | null; },
    async set(key,value,ttl) { await command('SET',key,value,'EX',ttl); },
    async claim(key,owner,ttl) { return await command('SET',key,owner,'EX',ttl,'NX') === 'OK'; },
    async release(key,owner) {
      await command('EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end return 0",1,key,owner);
    }
  };
}
