export interface BlogPost{id:string;title:string;slug:string;excerpt:string;content:string;author:string;thumbnail?:string;tags:string[];publishedAt:string;views:number}
export interface BlogCategory{id:string;name:string;slug:string;count:number}
export interface BlogComment{id:string;postId:string;userId:string;content:string;createdAt:string}feat: add blog type definitions
