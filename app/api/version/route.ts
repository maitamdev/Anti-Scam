import{NextResponse}from'next/server'
export async function GET(){return NextResponse.json({version:'1.0.0',build:process.env.VERCEL_GIT_COMMIT_SHA?.slice(0,7)||'dev',environment:process.env.NODE_ENV||'development',features:{scan:true,imageScan:true,quiz:true,blockchain:true,extension:true}})}feat: add app version API endpoint
