export interface ScanResult{id:string;url:string;domain:string;score:number;label:'SAFE'|'CAUTION'|'DANGEROUS';reasons:string[];aiConfidence:number;heuristicScore:number;aiScore:number;createdAt:string}
export interface ScanRequest{url:string;userId?:string;source?:'web'|'api'|'extension'}
export interface ImageScanResult{id:string;imageHash:string;score:number;label:string;category?:string;reasons:string[];extractedText?:string;confidence:number}
export type RiskLabel='SAFE'|'CAUTION'|'DANGEROUS'feat: add scan result type definitions
