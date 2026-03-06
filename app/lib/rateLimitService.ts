const TIER_LIMITS:Record<string,{scan:number;imageScan:number;api:number}>={FREE:{scan:5,imageScan:2,api:0},PRO:{scan:50,imageScan:20,api:100},BUSINESS:{scan:500,imageScan:100,api:1000},ENTERPRISE:{scan:999999,imageScan:999999,api:999999}}
export function getTierLimits(tier:string){return TIER_LIMITS[tier]||TIER_LIMITS.FREE}
export function canPerformAction(tier:string,action:'scan'|'imageScan'|'api',currentUsage:number):boolean{const limits=getTierLimits(tier);return currentUsage<limits[action]}
export function getRemainingQuota(tier:string,action:'scan'|'imageScan'|'api',currentUsage:number):number{const limits=getTierLimits(tier);return Math.max(0,limits[action]-currentUsage)}feat: add tier-based rate limit service
