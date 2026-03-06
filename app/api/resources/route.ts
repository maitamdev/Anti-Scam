import{NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(){try{const resources=await prisma.downloadableResource.findMany({where:{isPublic:true},orderBy:{downloads:'desc'}});return NextResponse.json({success:true,data:resources})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add downloadable resources API endpoint
