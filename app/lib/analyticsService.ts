export interface AnalyticsEvent{name:string;properties?:Record<string,unknown>;timestamp:number}
const eventQueue:AnalyticsEvent[]=[]
export function trackEvent(name:string,properties?:Record<string,unknown>){eventQueue.push({name,properties,timestamp:Date.now()})}
export function trackPageView(path:string){trackEvent('page_view',{path})}
export function trackScan(url:string,score:number,label:string){trackEvent('scan',{url,score,label})}
export function trackError(error:string,context?:string){trackEvent('error',{error,context})}
export function flushEvents(){const events=[...eventQueue];eventQueue.length=0;return events}feat: add client-side analytics tracking service
