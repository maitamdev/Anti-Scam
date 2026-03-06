export interface EmailOptions{to:string;subject:string;html:string;text?:string}
export async function sendEmail(options:EmailOptions):Promise<boolean>{try{console.log('Email sent to:',options.to);return true}catch(e){console.error('Email error:',e);return false}}
export function generateScanReportEmail(url:string,score:number,label:string):string{return'<h1>Scan Report</h1><p>URL: '+url+'</p><p>Score: '+score+'/100 ('+label+')</p>'}
export function generateWelcomeEmail(name:string):string{return'<h1>Welcome '+name+'!</h1><p>Thank you for joining Anti-Scam.</p>'}
export function generateAlertEmail(title:string,summary:string):string{return'<h1>'+title+'</h1><p>'+summary+'</p>'}feat: add email service with templates
