export interface ApiResponse<T=unknown>{success:boolean;data?:T;error?:{message:string;code:string};meta?:{page?:number;limit?:number;total?:number}}
export interface PaginatedRequest{page?:number;limit?:number;sort?:string;order?:'asc'|'desc'}
export interface ApiKeyInfo{id:string;name:string;prefix:string;lastUsedAt?:string;createdAt:string;isActive:boolean}
export type HttpMethod='GET'|'POST'|'PUT'|'PATCH'|'DELETE'feat: add API request and response type definitions
