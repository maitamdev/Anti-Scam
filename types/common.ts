export interface PaginationMeta{page:number;limit:number;total:number;totalPages:number;hasNext:boolean;hasPrev:boolean}
export interface SortOptions{field:string;direction:'asc'|'desc'}
export interface FilterOptions{search?:string;status?:string;dateFrom?:string;dateTo?:string;category?:string}
export interface SelectOption{value:string;label:string;disabled?:boolean}feat: add common shared type definitions
