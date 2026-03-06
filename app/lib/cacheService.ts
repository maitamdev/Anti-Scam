const cache=new Map<string,{data:unknown;expires:number}>()
export function getCache<T>(key:string):T|null{const item=cache.get(key);if(!item)return null;if(Date.now()>item.expires){cache.delete(key);return null}return item.data as T}
export function setCache(key:string,data:unknown,ttlMs:number=300000){cache.set(key,{data,expires:Date.now()+ttlMs})}
export function deleteCache(key:string){cache.delete(key)}
export function clearCache(){cache.clear()}
export function getCacheSize(){return cache.size}
export function getCacheKeys(){return Array.from(cache.keys())}feat: add in-memory cache service with TTL
