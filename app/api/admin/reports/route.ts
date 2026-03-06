import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(req:NextRequest){try{const status=req.nextUrl.searchParams.get('status')||'PENDING';const reports=await prisma.userReport.findMany({where:{status:status as any},orderBy:{createdAt:'desc'},take:50});return NextResponse.json({success:true,data:reports})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add admin report management API endpoint
