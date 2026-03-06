import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function POST(req:NextRequest){try{const{email}=await req.json();if(!email)return NextResponse.json({success:false,error:'Email required'},{status:400});const found=await prisma.scamEmail.findUnique({where:{email}});return NextResponse.json({success:true,data:{email,isScam:!!found,reportCount:found?.reportCount||0,category:found?.category||null}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add email scam check API endpoint
