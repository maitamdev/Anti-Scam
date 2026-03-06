export interface Organization{id:string;name:string;slug:string;logo?:string;industry?:string;size:'SMALL'|'MEDIUM'|'LARGE'|'ENTERPRISE';tier:string;contactEmail?:string}
export interface OrgMember{id:string;userId:string;role:'OWNER'|'ADMIN'|'TRAINER'|'MEMBER';department?:string;joinedAt:string}
export interface OrgInvite{email:string;role:string;message?:string}feat: add organization type definitions
