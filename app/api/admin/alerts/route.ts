import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(){try{const alerts=await prisma.scamAlert.findMany({orderBy:{createdAt:'desc'},take:50});return NextResponse.json({success:true,data:alerts})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}
export async function POST(req:NextRequest){try{const body=await req.json();const alert=await prisma.scamAlert.create({data:{...body,slug:body.title.toLowerCase().replace(/\s+/g,'-')}});return NextResponse.json({success:true,data:alert})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add admin scam alerts CRUD API endpoint
