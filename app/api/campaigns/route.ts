import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(){try{const campaigns=await prisma.campaign.findMany({where:{isPublic:true,status:'ACTIVE'},orderBy:{createdAt:'desc'},take:20});return NextResponse.json({success:true,data:campaigns})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add campaigns listing API endpoint
