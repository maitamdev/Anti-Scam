export function exportToJson(data:unknown,filename:string='export.json'){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});downloadBlob(blob,filename)}
export function exportToText(text:string,filename:string='export.txt'){const blob=new Blob([text],{type:'text/plain'});downloadBlob(blob,filename)}
function downloadBlob(blob:Blob,filename:string){if(typeof window==='undefined')return;const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url)}feat: add data export service for JSON and text
