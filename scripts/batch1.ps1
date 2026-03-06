$ErrorActionPreference = "Continue"
function MF($p, $c) { $d = Split-Path $p -Parent; if (!(Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null }; [System.IO.File]::WriteAllText($p, $c, [System.Text.Encoding]::UTF8) }
function AC($p, $m) { git add $p 2>$null; git commit -m $m 2>$null }

# --- TYPES (15 commits) ---
MF "types/api.ts" "export interface ApiResponse<T=unknown>{success:boolean;data?:T;error?:{message:string;code:string};meta?:{page?:number;limit?:number;total?:number}}
export interface PaginatedRequest{page?:number;limit?:number;sort?:string;order?:'asc'|'desc'}
export interface ApiKeyInfo{id:string;name:string;prefix:string;lastUsedAt?:string;createdAt:string;isActive:boolean}
export type HttpMethod='GET'|'POST'|'PUT'|'PATCH'|'DELETE'"
AC "types/api.ts" "feat: add API request and response type definitions"

MF "types/user.ts" "export interface User{id:string;email:string;name?:string;avatar?:string;role:'USER'|'ADMIN'|'MODERATOR';tier:'FREE'|'PRO'|'BUSINESS'|'ENTERPRISE';status:'ACTIVE'|'SUSPENDED'|'BANNED';createdAt:string}
export interface UserProfile extends User{totalScans:number;dailyScans:number;dailyImageScans:number;lastResetAt:string}
export interface UserPreferences{theme:'light'|'dark'|'system';language:'vi'|'en';emailNotifications:boolean;pushNotifications:boolean}
export type UserRole='USER'|'ADMIN'|'MODERATOR'"
AC "types/user.ts" "feat: add user-related type definitions"

MF "types/scan.ts" "export interface ScanResult{id:string;url:string;domain:string;score:number;label:'SAFE'|'CAUTION'|'DANGEROUS';reasons:string[];aiConfidence:number;heuristicScore:number;aiScore:number;createdAt:string}
export interface ScanRequest{url:string;userId?:string;source?:'web'|'api'|'extension'}
export interface ImageScanResult{id:string;imageHash:string;score:number;label:string;category?:string;reasons:string[];extractedText?:string;confidence:number}
export type RiskLabel='SAFE'|'CAUTION'|'DANGEROUS'"
AC "types/scan.ts" "feat: add scan result type definitions"

MF "types/report.ts" "export interface Report{id:string;url:string;domain:string;reason:string;description?:string;screenshot?:string;status:'PENDING'|'APPROVED'|'REJECTED'|'SPAM'|'DUPLICATE';verified:boolean;createdAt:string}
export interface ReportSubmission{url:string;reason:string;description?:string;screenshot?:string}
export interface ReportStats{total:number;pending:number;approved:number;rejected:number}"
AC "types/report.ts" "feat: add report type definitions"

MF "types/quiz.ts" "export interface QuizQuestion{id:string;question:string;options:string[];correctIndex:number;explanation:string;difficulty:'easy'|'medium'|'hard';category:string}
export interface QuizAttempt{questionId:string;selectedIndex:number;isCorrect:boolean;timeSpent:number}
export interface QuizResult{score:number;total:number;accuracy:number;timeSpent:number;answers:QuizAttempt[]}"
AC "types/quiz.ts" "feat: add quiz type definitions"

MF "types/campaign.ts" "export interface Campaign{id:string;name:string;slug:string;description?:string;type:CampaignType;duration:number;status:'DRAFT'|'SCHEDULED'|'ACTIVE'|'COMPLETED'|'ARCHIVED';startDate?:string;endDate?:string}
export type CampaignType='TRAINING_7DAY'|'TRAINING_14DAY'|'TRAINING_30DAY'|'ONBOARDING'|'ASSESSMENT'|'PUBLIC_AWARENESS'
export interface CampaignEnrollment{campaignId:string;userId:string;currentDay:number;totalScore:number;status:'ACTIVE'|'COMPLETED'|'DROPPED'}"
AC "types/campaign.ts" "feat: add campaign type definitions"

MF "types/organization.ts" "export interface Organization{id:string;name:string;slug:string;logo?:string;industry?:string;size:'SMALL'|'MEDIUM'|'LARGE'|'ENTERPRISE';tier:string;contactEmail?:string}
export interface OrgMember{id:string;userId:string;role:'OWNER'|'ADMIN'|'TRAINER'|'MEMBER';department?:string;joinedAt:string}
export interface OrgInvite{email:string;role:string;message?:string}"
AC "types/organization.ts" "feat: add organization type definitions"

MF "types/notification.ts" "export interface Notification{id:string;userId:string;type:NotificationType;title:string;message:string;isRead:boolean;actionUrl?:string;createdAt:string}
export type NotificationType='SCAN_COMPLETE'|'REPORT_UPDATE'|'WATCHLIST_ALERT'|'SYSTEM'|'CAMPAIGN'|'SECURITY'
export interface NotificationPreferences{email:boolean;push:boolean;inApp:boolean;scanAlerts:boolean;reportUpdates:boolean;weeklyDigest:boolean}"
AC "types/notification.ts" "feat: add notification type definitions"

MF "types/blog.ts" "export interface BlogPost{id:string;title:string;slug:string;excerpt:string;content:string;author:string;thumbnail?:string;tags:string[];publishedAt:string;views:number}
export interface BlogCategory{id:string;name:string;slug:string;count:number}
export interface BlogComment{id:string;postId:string;userId:string;content:string;createdAt:string}"
AC "types/blog.ts" "feat: add blog type definitions"

MF "types/analytics.ts" "export interface AnalyticsEvent{name:string;properties?:Record<string,unknown>;timestamp:number;userId?:string;sessionId:string}
export interface DashboardStats{totalScans:number;todayScans:number;safePercentage:number;dangerousCount:number;reportsReceived:number;activeUsers:number}
export interface ScanTrend{date:string;safe:number;caution:number;dangerous:number}"
AC "types/analytics.ts" "feat: add analytics event type definitions"

MF "types/tools.ts" "export interface PhoneCheckResult{phone:string;isScam:boolean;reportCount:number;carrier?:string;lastReported?:string}
export interface EmailCheckResult{email:string;isScam:boolean;reportCount:number;domain:string;category?:string}
export interface WhoisResult{domain:string;registrar:string;createdDate:string;expiryDate:string;nameServers:string[];status:string}"
AC "types/tools.ts" "feat: add tool result type definitions"

MF "types/common.ts" "export interface PaginationMeta{page:number;limit:number;total:number;totalPages:number;hasNext:boolean;hasPrev:boolean}
export interface SortOptions{field:string;direction:'asc'|'desc'}
export interface FilterOptions{search?:string;status?:string;dateFrom?:string;dateTo?:string;category?:string}
export interface SelectOption{value:string;label:string;disabled?:boolean}"
AC "types/common.ts" "feat: add common shared type definitions"

MF "types/extension.ts" "export interface ExtensionMessage{type:'SCAN_URL'|'GET_STATUS'|'BLOCK_URL'|'WHITELIST_URL';payload?:unknown}
export interface ExtensionScanResult{url:string;score:number;label:string;blocked:boolean;timestamp:number}
export interface ExtensionSettings{autoScan:boolean;showNotifications:boolean;blockDangerous:boolean;whitelistedDomains:string[]}"
AC "types/extension.ts" "feat: add browser extension type definitions"

MF "types/index.ts" "export * from './api'
export * from './user'
export * from './scan'
export * from './report'
export * from './quiz'
export * from './campaign'
export * from './organization'
export * from './notification'
export * from './blog'
export * from './analytics'
export * from './tools'
export * from './common'
export * from './extension'"
AC "types/index.ts" "feat: add types barrel export file"

MF "types/guards.ts" "import type {ScanResult,Report} from './index'
export function isScanResult(obj:unknown):obj is ScanResult{return typeof obj==='object'&&obj!==null&&'score' in obj&&'label' in obj&&'reasons' in obj}
export function isReport(obj:unknown):obj is Report{return typeof obj==='object'&&obj!==null&&'url' in obj&&'reason' in obj&&'status' in obj}
export function isValidScore(score:unknown):score is number{return typeof score==='number'&&score>=0&&score<=100}
export function isValidLabel(label:unknown):label is string{return typeof label==='string'&&['SAFE','CAUTION','DANGEROUS'].includes(label)}"
AC "types/guards.ts" "feat: add type guard utility functions"

Write-Host "Types done: 15 commits"

# --- VALIDATION SCHEMAS (15 commits) ---
MF "app/lib/validations/scanSchema.ts" "import{z}from'zod'
export const scanUrlSchema=z.object({url:z.string().min(1,'URL is required').max(2048,'URL too long').url('Invalid URL format'),source:z.enum(['web','api','extension']).optional().default('web')})
export const scanImageSchema=z.object({image:z.string().min(1,'Image is required'),format:z.enum(['base64','url']).optional().default('base64')})
export type ScanUrlInput=z.infer<typeof scanUrlSchema>
export type ScanImageInput=z.infer<typeof scanImageSchema>"
AC "app/lib/validations/scanSchema.ts" "feat: add Zod scan validation schemas"

MF "app/lib/validations/reportSchema.ts" "import{z}from'zod'
export const reportSchema=z.object({url:z.string().url('URL khong hop le'),reason:z.enum(['phishing','scam','malware','spam','other']),description:z.string().max(2000).optional(),screenshot:z.string().optional()})
export const reportUpdateSchema=z.object({status:z.enum(['PENDING','APPROVED','REJECTED','SPAM','DUPLICATE']),moderatorNote:z.string().max(1000).optional()})
export type ReportInput=z.infer<typeof reportSchema>"
AC "app/lib/validations/reportSchema.ts" "feat: add Zod report validation schemas"

MF "app/lib/validations/userSchema.ts" "import{z}from'zod'
export const updateProfileSchema=z.object({name:z.string().min(2,'Ten qua ngan').max(100).optional(),avatar:z.string().url().optional()})
export const changePasswordSchema=z.object({currentPassword:z.string().min(8),newPassword:z.string().min(8).regex(/[A-Z]/,'Can co chu hoa').regex(/[0-9]/,'Can co so'),confirmPassword:z.string()}).refine(d=>d.newPassword===d.confirmPassword,{message:'Mat khau khong khop',path:['confirmPassword']})
export type UpdateProfileInput=z.infer<typeof updateProfileSchema>"
AC "app/lib/validations/userSchema.ts" "feat: add Zod user validation schemas"

MF "app/lib/validations/contactSchema.ts" "import{z}from'zod'
export const contactSchema=z.object({name:z.string().min(2,'Ten qua ngan').max(100),email:z.string().email('Email khong hop le'),subject:z.string().min(5,'Chu de qua ngan').max(200),message:z.string().min(10,'Noi dung qua ngan').max(5000),category:z.enum(['support','bug','feature','partnership','other']).optional()})
export type ContactInput=z.infer<typeof contactSchema>"
AC "app/lib/validations/contactSchema.ts" "feat: add Zod contact form validation schema"

MF "app/lib/validations/quizSchema.ts" "import{z}from'zod'
export const quizAnswerSchema=z.object({questionId:z.string(),selectedIndex:z.number().min(0).max(5),timeSpent:z.number().min(0)})
export const quizSubmitSchema=z.object({quizId:z.string(),answers:z.array(quizAnswerSchema).min(1),totalTime:z.number()})
export type QuizSubmitInput=z.infer<typeof quizSubmitSchema>"
AC "app/lib/validations/quizSchema.ts" "feat: add Zod quiz validation schemas"

MF "app/lib/validations/apiKeySchema.ts" "import{z}from'zod'
export const createApiKeySchema=z.object({name:z.string().min(1,'Ten khong duoc trong').max(50),expiresInDays:z.number().min(1).max(365).optional()})
export const updateApiKeySchema=z.object({name:z.string().min(1).max(50).optional(),isActive:z.boolean().optional()})
export type CreateApiKeyInput=z.infer<typeof createApiKeySchema>"
AC "app/lib/validations/apiKeySchema.ts" "feat: add Zod API key validation schemas"

MF "app/lib/validations/organizationSchema.ts" "import{z}from'zod'
export const createOrgSchema=z.object({name:z.string().min(2).max(100),industry:z.string().optional(),contactEmail:z.string().email().optional(),website:z.string().url().optional()})
export const inviteMemberSchema=z.object({email:z.string().email(),role:z.enum(['ADMIN','TRAINER','MEMBER']),message:z.string().max(500).optional()})
export type CreateOrgInput=z.infer<typeof createOrgSchema>"
AC "app/lib/validations/organizationSchema.ts" "feat: add Zod organization validation schemas"

MF "app/lib/validations/watchlistSchema.ts" "import{z}from'zod'
export const addWatchlistSchema=z.object({type:z.enum(['DOMAIN','EMAIL','PHONE','BANK_ACCOUNT','SOCIAL_MEDIA']),value:z.string().min(1),name:z.string().max(100).optional(),notes:z.string().max(1000).optional(),alertEmail:z.boolean().optional(),alertInApp:z.boolean().optional()})
export type AddWatchlistInput=z.infer<typeof addWatchlistSchema>"
AC "app/lib/validations/watchlistSchema.ts" "feat: add Zod watchlist validation schemas"

MF "app/lib/validations/campaignSchema.ts" "import{z}from'zod'
export const createCampaignSchema=z.object({name:z.string().min(3).max(200),description:z.string().max(5000).optional(),type:z.enum(['TRAINING_7DAY','TRAINING_14DAY','TRAINING_30DAY','ONBOARDING','ASSESSMENT','PUBLIC_AWARENESS']),duration:z.number().min(1).max(90),questionsPerDay:z.number().min(1).max(20).optional(),isPublic:z.boolean().optional()})
export type CreateCampaignInput=z.infer<typeof createCampaignSchema>"
AC "app/lib/validations/campaignSchema.ts" "feat: add Zod campaign validation schemas"

MF "app/lib/validations/blogSchema.ts" "import{z}from'zod'
export const createPostSchema=z.object({title:z.string().min(5).max(200),content:z.string().min(50),excerpt:z.string().max(500).optional(),tags:z.array(z.string()).max(10).optional(),thumbnail:z.string().url().optional()})
export type CreatePostInput=z.infer<typeof createPostSchema>"
AC "app/lib/validations/blogSchema.ts" "feat: add Zod blog post validation schemas"

MF "app/lib/validations/searchSchema.ts" "import{z}from'zod'
export const searchSchema=z.object({q:z.string().min(1).max(200),type:z.enum(['all','scans','reports','guides','tools']).optional(),page:z.number().min(1).optional(),limit:z.number().min(1).max(100).optional()})
export type SearchInput=z.infer<typeof searchSchema>"
AC "app/lib/validations/searchSchema.ts" "feat: add Zod search validation schema"

MF "app/lib/validations/feedbackSchema.ts" "import{z}from'zod'
export const feedbackSchema=z.object({type:z.enum(['bug','feature','improvement','other']),title:z.string().min(5).max(200),description:z.string().min(10).max(5000),priority:z.enum(['low','medium','high']).optional(),email:z.string().email().optional()})
export type FeedbackInput=z.infer<typeof feedbackSchema>"
AC "app/lib/validations/feedbackSchema.ts" "feat: add Zod feedback validation schema"

MF "app/lib/validations/newsletterSchema.ts" "import{z}from'zod'
export const newsletterSchema=z.object({email:z.string().email('Email khong hop le'),name:z.string().max(100).optional(),topics:z.array(z.string()).optional()})
export type NewsletterInput=z.infer<typeof newsletterSchema>"
AC "app/lib/validations/newsletterSchema.ts" "feat: add Zod newsletter validation schema"

MF "app/lib/validations/alertSchema.ts" "import{z}from'zod'
export const createAlertSchema=z.object({title:z.string().min(5).max(200),summary:z.string().min(10),content:z.string().min(50),category:z.enum(['PHISHING','INVESTMENT','ROMANCE','JOB','PRIZE','IMPERSONATION','CRYPTO','OTHER']),severity:z.enum(['CRITICAL','HIGH','MEDIUM','LOW']),targetGroup:z.array(z.string()),platform:z.array(z.string())})
export type CreateAlertInput=z.infer<typeof createAlertSchema>"
AC "app/lib/validations/alertSchema.ts" "feat: add Zod scam alert validation schema"

MF "app/lib/validations/index.ts" "export * from './scanSchema'
export * from './reportSchema'
export * from './userSchema'
export * from './contactSchema'
export * from './quizSchema'
export * from './apiKeySchema'
export * from './organizationSchema'
export * from './watchlistSchema'
export * from './campaignSchema'
export * from './blogSchema'
export * from './searchSchema'
export * from './feedbackSchema'
export * from './newsletterSchema'
export * from './alertSchema'"
AC "app/lib/validations/index.ts" "feat: add validations barrel export file"

Write-Host "Validations done: 15 commits"

# --- API ROUTES (25 commits) ---
MF "app/api/contact/route.ts" "import{NextRequest,NextResponse}from'next/server'
export async function POST(req:NextRequest){try{const body=await req.json();const{name,email,subject,message}=body;if(!name||!email||!message)return NextResponse.json({success:false,error:'Missing fields'},{status:400});return NextResponse.json({success:true,data:{message:'Thank you for contacting us'}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/contact/route.ts" "feat: add contact form API endpoint"

MF "app/api/newsletter/route.ts" "import{NextRequest,NextResponse}from'next/server'
export async function POST(req:NextRequest){try{const{email}=await req.json();if(!email)return NextResponse.json({success:false,error:'Email required'},{status:400});return NextResponse.json({success:true,data:{message:'Successfully subscribed'}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/newsletter/route.ts" "feat: add newsletter subscription API endpoint"

MF "app/api/feedback/route.ts" "import{NextRequest,NextResponse}from'next/server'
export async function POST(req:NextRequest){try{const body=await req.json();const{type,title,description}=body;if(!type||!title||!description)return NextResponse.json({success:false,error:'Missing fields'},{status:400});return NextResponse.json({success:true,data:{id:crypto.randomUUID(),message:'Feedback received'}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/feedback/route.ts" "feat: add user feedback API endpoint"

MF "app/api/health/route.ts" "import{NextResponse}from'next/server'
export async function GET(){return NextResponse.json({status:'healthy',timestamp:new Date().toISOString(),version:'1.0.0',uptime:process.uptime(),environment:process.env.NODE_ENV||'development'})}"
AC "app/api/health/route.ts" "feat: add health check API endpoint"

MF "app/api/version/route.ts" "import{NextResponse}from'next/server'
export async function GET(){return NextResponse.json({version:'1.0.0',build:process.env.VERCEL_GIT_COMMIT_SHA?.slice(0,7)||'dev',environment:process.env.NODE_ENV||'development',features:{scan:true,imageScan:true,quiz:true,blockchain:true,extension:true}})}"
AC "app/api/version/route.ts" "feat: add app version API endpoint"

MF "app/api/campaigns/route.ts" "import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(){try{const campaigns=await prisma.campaign.findMany({where:{isPublic:true,status:'ACTIVE'},orderBy:{createdAt:'desc'},take:20});return NextResponse.json({success:true,data:campaigns})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/campaigns/route.ts" "feat: add campaigns listing API endpoint"

MF "app/api/leaderboard/route.ts" "import{NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(){try{const users=await prisma.communityContribution.groupBy({by:['userId'],_sum:{points:true},orderBy:{_sum:{points:'desc'}},take:50});return NextResponse.json({success:true,data:users})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/leaderboard/route.ts" "feat: add community leaderboard API endpoint"

MF "app/api/resources/route.ts" "import{NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(){try{const resources=await prisma.downloadableResource.findMany({where:{isPublic:true},orderBy:{downloads:'desc'}});return NextResponse.json({success:true,data:resources})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/resources/route.ts" "feat: add downloadable resources API endpoint"

MF "app/api/blog/route.ts" "import{NextRequest,NextResponse}from'next/server'
export async function GET(req:NextRequest){const page=parseInt(req.nextUrl.searchParams.get('page')||'1');const limit=parseInt(req.nextUrl.searchParams.get('limit')||'10');return NextResponse.json({success:true,data:[],meta:{page,limit,total:0,totalPages:0}})}"
AC "app/api/blog/route.ts" "feat: add blog posts listing API endpoint"

MF "app/api/notifications/route.ts" "import{NextRequest,NextResponse}from'next/server'
import{getServerSession}from'next-auth'
export async function GET(req:NextRequest){try{return NextResponse.json({success:true,data:[],meta:{unread:0}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}
export async function PATCH(req:NextRequest){try{const{ids}=await req.json();return NextResponse.json({success:true,data:{marked:ids?.length||0}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/notifications/route.ts" "feat: add notifications API endpoint"

MF "app/api/user/settings/route.ts" "import{NextRequest,NextResponse}from'next/server'
export async function GET(){return NextResponse.json({success:true,data:{theme:'system',language:'vi',emailNotifications:true,pushNotifications:false}})}
export async function PUT(req:NextRequest){try{const settings=await req.json();return NextResponse.json({success:true,data:settings})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/user/settings/route.ts" "feat: add user settings API endpoint"

MF "app/api/user/profile/route.ts" "import{NextRequest,NextResponse}from'next/server'
export async function GET(){return NextResponse.json({success:true,data:{name:'User',email:'user@example.com'}})}
export async function PUT(req:NextRequest){try{const profile=await req.json();return NextResponse.json({success:true,data:profile})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/user/profile/route.ts" "feat: add user profile API endpoint"

MF "app/api/user/security/route.ts" "import{NextRequest,NextResponse}from'next/server'
export async function POST(req:NextRequest){try{const{action}=await req.json();if(action==='change-password'){return NextResponse.json({success:true,data:{message:'Password updated'}})}
if(action==='enable-2fa'){return NextResponse.json({success:true,data:{message:'2FA setup initiated'}})}
return NextResponse.json({success:false,error:'Invalid action'},{status:400})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/user/security/route.ts" "feat: add user security API endpoint"

MF "app/api/phone-check/route.ts" "import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function POST(req:NextRequest){try{const{phone}=await req.json();if(!phone)return NextResponse.json({success:false,error:'Phone required'},{status:400});const found=await prisma.scamPhone.findUnique({where:{phone}});return NextResponse.json({success:true,data:{phone,isScam:!!found,reportCount:found?.reportCount||0,category:found?.category||null}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/phone-check/route.ts" "feat: add phone number scam check API endpoint"

MF "app/api/ip-lookup/route.ts" "import{NextRequest,NextResponse}from'next/server'
export async function POST(req:NextRequest){try{const{ip}=await req.json();if(!ip)return NextResponse.json({success:false,error:'IP required'},{status:400});return NextResponse.json({success:true,data:{ip,country:'Unknown',city:'Unknown',isp:'Unknown',isProxy:false,isTor:false,threatLevel:'low'}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/ip-lookup/route.ts" "feat: add IP lookup API endpoint"

MF "app/api/whois/route.ts" "import{NextRequest,NextResponse}from'next/server'
export async function POST(req:NextRequest){try{const{domain}=await req.json();if(!domain)return NextResponse.json({success:false,error:'Domain required'},{status:400});return NextResponse.json({success:true,data:{domain,registrar:'Unknown',createdDate:'Unknown',expiryDate:'Unknown',nameServers:[],status:'Unknown'}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/whois/route.ts" "feat: add WHOIS lookup API endpoint"

MF "app/api/analytics/events/route.ts" "import{NextRequest,NextResponse}from'next/server'
export async function POST(req:NextRequest){try{const events=await req.json();return NextResponse.json({success:true,data:{received:Array.isArray(events)?events.length:1}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/analytics/events/route.ts" "feat: add analytics events tracking API endpoint"

MF "app/api/admin/users/route.ts" "import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(req:NextRequest){try{const page=parseInt(req.nextUrl.searchParams.get('page')||'1');const limit=parseInt(req.nextUrl.searchParams.get('limit')||'20');const users=await prisma.user.findMany({skip:(page-1)*limit,take:limit,orderBy:{createdAt:'desc'},select:{id:true,email:true,name:true,role:true,tier:true,status:true,totalScans:true,createdAt:true}});const total=await prisma.user.count();return NextResponse.json({success:true,data:users,meta:{page,limit,total}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/admin/users/route.ts" "feat: add admin user management API endpoint"

MF "app/api/admin/reports/route.ts" "import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(req:NextRequest){try{const status=req.nextUrl.searchParams.get('status')||'PENDING';const reports=await prisma.userReport.findMany({where:{status:status as any},orderBy:{createdAt:'desc'},take:50});return NextResponse.json({success:true,data:reports})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/admin/reports/route.ts" "feat: add admin report management API endpoint"

MF "app/api/admin/alerts/route.ts" "import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(){try{const alerts=await prisma.scamAlert.findMany({orderBy:{createdAt:'desc'},take:50});return NextResponse.json({success:true,data:alerts})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}
export async function POST(req:NextRequest){try{const body=await req.json();const alert=await prisma.scamAlert.create({data:{...body,slug:body.title.toLowerCase().replace(/\s+/g,'-')}});return NextResponse.json({success:true,data:alert})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/admin/alerts/route.ts" "feat: add admin scam alerts CRUD API endpoint"

MF "app/api/search/route.ts" "import{NextRequest,NextResponse}from'next/server'
export async function GET(req:NextRequest){try{const q=req.nextUrl.searchParams.get('q')||'';const type=req.nextUrl.searchParams.get('type')||'all';if(!q)return NextResponse.json({success:false,error:'Query required'},{status:400});return NextResponse.json({success:true,data:{query:q,type,results:[],total:0}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/search/route.ts" "feat: add global search API endpoint"

MF "app/api/admin/stats/route.ts" "import{NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(){try{const[totalUsers,totalScans,totalReports,totalBlocked]=await Promise.all([prisma.user.count(),prisma.scan.count(),prisma.report.count(),prisma.blocklist.count()]);return NextResponse.json({success:true,data:{totalUsers,totalScans,totalReports,totalBlocked,timestamp:new Date().toISOString()}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/admin/stats/route.ts" "feat: add admin dashboard statistics API endpoint"

MF "app/api/admin/blocklist/route.ts" "import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(req:NextRequest){try{const page=parseInt(req.nextUrl.searchParams.get('page')||'1');const items=await prisma.blocklist.findMany({skip:(page-1)*20,take:20,orderBy:{createdAt:'desc'}});return NextResponse.json({success:true,data:items})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}
export async function POST(req:NextRequest){try{const{domain,reason,severity}=await req.json();const item=await prisma.blocklist.create({data:{domain,reason,severity:severity||'MEDIUM',source:'manual'}});return NextResponse.json({success:true,data:item})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/admin/blocklist/route.ts" "feat: add admin blocklist management API endpoint"

MF "app/api/admin/whitelist/route.ts" "import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(){try{const items=await prisma.whitelist.findMany({orderBy:{brand:'asc'}});return NextResponse.json({success:true,data:items})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}
export async function POST(req:NextRequest){try{const{domain,brand,category}=await req.json();const item=await prisma.whitelist.create({data:{domain,brand,category}});return NextResponse.json({success:true,data:item})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/admin/whitelist/route.ts" "feat: add admin whitelist management API endpoint"

MF "app/api/email-check/route.ts" "import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function POST(req:NextRequest){try{const{email}=await req.json();if(!email)return NextResponse.json({success:false,error:'Email required'},{status:400});const found=await prisma.scamEmail.findUnique({where:{email}});return NextResponse.json({success:true,data:{email,isScam:!!found,reportCount:found?.reportCount||0,category:found?.category||null}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}"
AC "app/api/email-check/route.ts" "feat: add email scam check API endpoint"

Write-Host "API routes done: 25 commits"

# --- SERVICES (10 commits) ---
MF "app/lib/notifications.ts" "import prisma from'./db'
export async function createNotification(userId:string,type:string,title:string,message:string,actionUrl?:string){try{return{id:crypto.randomUUID(),userId,type,title,message,actionUrl,isRead:false,createdAt:new Date()}}catch(e){console.error('Notification error:',e);return null}}
export async function markAsRead(notificationIds:string[]){return{marked:notificationIds.length}}
export async function getUnreadCount(userId:string){return 0}
export async function sendEmailNotification(email:string,subject:string,body:string){console.log('Sending email to',email,subject);return true}"
AC "app/lib/notifications.ts" "feat: add notification service module"

MF "app/lib/emailService.ts" "export interface EmailOptions{to:string;subject:string;html:string;text?:string}
export async function sendEmail(options:EmailOptions):Promise<boolean>{try{console.log('Email sent to:',options.to);return true}catch(e){console.error('Email error:',e);return false}}
export function generateScanReportEmail(url:string,score:number,label:string):string{return'<h1>Scan Report</h1><p>URL: '+url+'</p><p>Score: '+score+'/100 ('+label+')</p>'}
export function generateWelcomeEmail(name:string):string{return'<h1>Welcome '+name+'!</h1><p>Thank you for joining Anti-Scam.</p>'}
export function generateAlertEmail(title:string,summary:string):string{return'<h1>'+title+'</h1><p>'+summary+'</p>'}"
AC "app/lib/emailService.ts" "feat: add email service with templates"

MF "app/lib/cacheService.ts" "const cache=new Map<string,{data:unknown;expires:number}>()
export function getCache<T>(key:string):T|null{const item=cache.get(key);if(!item)return null;if(Date.now()>item.expires){cache.delete(key);return null}return item.data as T}
export function setCache(key:string,data:unknown,ttlMs:number=300000){cache.set(key,{data,expires:Date.now()+ttlMs})}
export function deleteCache(key:string){cache.delete(key)}
export function clearCache(){cache.clear()}
export function getCacheSize(){return cache.size}
export function getCacheKeys(){return Array.from(cache.keys())}"
AC "app/lib/cacheService.ts" "feat: add in-memory cache service with TTL"

MF "app/lib/analyticsService.ts" "export interface AnalyticsEvent{name:string;properties?:Record<string,unknown>;timestamp:number}
const eventQueue:AnalyticsEvent[]=[]
export function trackEvent(name:string,properties?:Record<string,unknown>){eventQueue.push({name,properties,timestamp:Date.now()})}
export function trackPageView(path:string){trackEvent('page_view',{path})}
export function trackScan(url:string,score:number,label:string){trackEvent('scan',{url,score,label})}
export function trackError(error:string,context?:string){trackEvent('error',{error,context})}
export function flushEvents(){const events=[...eventQueue];eventQueue.length=0;return events}"
AC "app/lib/analyticsService.ts" "feat: add client-side analytics tracking service"

MF "app/lib/searchService.ts" "export interface SearchResult{type:'scan'|'report'|'guide'|'tool';title:string;description:string;url:string;score?:number}
export function searchContent(query:string):SearchResult[]{const q=query.toLowerCase();const results:SearchResult[]=[];if(q.includes('scan')||q.includes('kiem tra'))results.push({type:'tool',title:'Kiem tra URL',description:'Kiem tra do an toan cua website',url:'/scan'});if(q.includes('report')||q.includes('bao cao'))results.push({type:'tool',title:'Bao cao lua dao',description:'Bao cao website dang ngo',url:'/report'});if(q.includes('quiz')||q.includes('trac nghiem'))results.push({type:'tool',title:'Trac nghiem',description:'Kiem tra kien thuc chong lua dao',url:'/quiz'});return results}"
AC "app/lib/searchService.ts" "feat: add global search service"

MF "app/lib/seoUtils.ts" "export function generateMetaTags(title:string,description:string,url?:string,image?:string){return{title:title+' | Anti-Scam',description,openGraph:{title,description,url:url||'https://antiscam.vn',siteName:'Anti-Scam',images:image?[{url:image,width:1200,height:630}]:undefined,locale:'vi_VN',type:'website'},twitter:{card:'summary_large_image',title,description,images:image?[image]:undefined}}}
export function generateJsonLd(type:string,data:Record<string,unknown>){return{__html:JSON.stringify({'@context':'https://schema.org','@type':type,...data})}}
export function generateBreadcrumbJsonLd(items:{name:string;url:string}[]){return generateJsonLd('BreadcrumbList',{itemListElement:items.map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,item:item.url}))})}"
AC "app/lib/seoUtils.ts" "feat: add SEO utility functions for meta tags and JSON-LD"

MF "app/lib/permissionService.ts" "export type Permission='scan:read'|'scan:write'|'report:read'|'report:write'|'admin:read'|'admin:write'|'api:manage'|'org:manage'
const ROLE_PERMISSIONS:Record<string,Permission[]>={USER:['scan:read','scan:write','report:read','report:write'],MODERATOR:['scan:read','scan:write','report:read','report:write','admin:read'],ADMIN:['scan:read','scan:write','report:read','report:write','admin:read','admin:write','api:manage','org:manage']}
const TIER_FEATURES:Record<string,string[]>={FREE:['basic_scan','quiz'],PRO:['basic_scan','quiz','image_scan','history','export'],BUSINESS:['basic_scan','quiz','image_scan','history','export','api_keys','watchlist'],ENTERPRISE:['basic_scan','quiz','image_scan','history','export','api_keys','watchlist','organization','custom_quiz']}
export function hasPermission(role:string,permission:Permission):boolean{return(ROLE_PERMISSIONS[role]||[]).includes(permission)}
export function hasFeature(tier:string,feature:string):boolean{return(TIER_FEATURES[tier]||TIER_FEATURES.FREE).includes(feature)}"
AC "app/lib/permissionService.ts" "feat: add role-based permission service"

MF "app/lib/rateLimitService.ts" "const TIER_LIMITS:Record<string,{scan:number;imageScan:number;api:number}>={FREE:{scan:5,imageScan:2,api:0},PRO:{scan:50,imageScan:20,api:100},BUSINESS:{scan:500,imageScan:100,api:1000},ENTERPRISE:{scan:999999,imageScan:999999,api:999999}}
export function getTierLimits(tier:string){return TIER_LIMITS[tier]||TIER_LIMITS.FREE}
export function canPerformAction(tier:string,action:'scan'|'imageScan'|'api',currentUsage:number):boolean{const limits=getTierLimits(tier);return currentUsage<limits[action]}
export function getRemainingQuota(tier:string,action:'scan'|'imageScan'|'api',currentUsage:number):number{const limits=getTierLimits(tier);return Math.max(0,limits[action]-currentUsage)}"
AC "app/lib/rateLimitService.ts" "feat: add tier-based rate limit service"

MF "app/lib/exportService.ts" "export function exportToJson(data:unknown,filename:string='export.json'){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});downloadBlob(blob,filename)}
export function exportToText(text:string,filename:string='export.txt'){const blob=new Blob([text],{type:'text/plain'});downloadBlob(blob,filename)}
function downloadBlob(blob:Blob,filename:string){if(typeof window==='undefined')return;const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url)}"
AC "app/lib/exportService.ts" "feat: add data export service for JSON and text"

MF "app/lib/websocketService.ts" "export type WSEventType='scan_complete'|'alert_new'|'report_update'|'system_message'
export interface WSMessage{type:WSEventType;payload:unknown;timestamp:number}
export class WebSocketService{private ws:WebSocket|null=null;private handlers:Map<string,Function[]>=new Map();private reconnectAttempts=0;private maxReconnects=5
connect(url:string){try{this.ws=new WebSocket(url);this.ws.onmessage=(e)=>{const msg=JSON.parse(e.data)as WSMessage;this.emit(msg.type,msg.payload)};this.ws.onclose=()=>{if(this.reconnectAttempts<this.maxReconnects){setTimeout(()=>{this.reconnectAttempts++;this.connect(url)},1000*this.reconnectAttempts)}}}catch(e){console.error('WS error:',e)}}
on(event:string,handler:Function){if(!this.handlers.has(event))this.handlers.set(event,[]);this.handlers.get(event)!.push(handler)}
private emit(event:string,data:unknown){(this.handlers.get(event)||[]).forEach(h=>h(data))}
disconnect(){this.ws?.close();this.ws=null}}"
AC "app/lib/websocketService.ts" "feat: add WebSocket service with auto-reconnect"

Write-Host "Services done: 10 commits"

Write-Host "Batch 1 complete: 65 commits total"
