import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function POST(req:NextRequest){try{const{phone}=await req.json();if(!phone)return NextResponse.json({success:false,error:'Phone required'},{status:400});const found=await prisma.scamPhone.findUnique({where:{phone}});return NextResponse.json({success:true,data:{phone,isScam:!!found,reportCount:found?.reportCount||0,category:found?.category||null}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add phone number scam check API endpoint
