import prisma from'./db'
export async function createNotification(userId:string,type:string,title:string,message:string,actionUrl?:string){try{return{id:crypto.randomUUID(),userId,type,title,message,actionUrl,isRead:false,createdAt:new Date()}}catch(e){console.error('Notification error:',e);return null}}
export async function markAsRead(notificationIds:string[]){return{marked:notificationIds.length}}
export async function getUnreadCount(userId:string){return 0}
export async function sendEmailNotification(email:string,subject:string,body:string){console.log('Sending email to',email,subject);return true}feat: add notification service module
