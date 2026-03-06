export interface ExtensionMessage{type:'SCAN_URL'|'GET_STATUS'|'BLOCK_URL'|'WHITELIST_URL';payload?:unknown}
export interface ExtensionScanResult{url:string;score:number;label:string;blocked:boolean;timestamp:number}
export interface ExtensionSettings{autoScan:boolean;showNotifications:boolean;blockDangerous:boolean;whitelistedDomains:string[]}feat: add browser extension type definitions
