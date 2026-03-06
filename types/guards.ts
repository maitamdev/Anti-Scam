import type {ScanResult,Report} from './index'
export function isScanResult(obj:unknown):obj is ScanResult{return typeof obj==='object'&&obj!==null&&'score' in obj&&'label' in obj&&'reasons' in obj}
export function isReport(obj:unknown):obj is Report{return typeof obj==='object'&&obj!==null&&'url' in obj&&'reason' in obj&&'status' in obj}
export function isValidScore(score:unknown):score is number{return typeof score==='number'&&score>=0&&score<=100}
export function isValidLabel(label:unknown):label is string{return typeof label==='string'&&['SAFE','CAUTION','DANGEROUS'].includes(label)}feat: add type guard utility functions
