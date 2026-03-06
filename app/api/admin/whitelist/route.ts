import{NextRequest,NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(){try{const items=await prisma.whitelist.findMany({orderBy:{brand:'asc'}});return NextResponse.json({success:true,data:items})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}
export async function POST(req:NextRequest){try{const{domain,brand,category}=await req.json();const item=await prisma.whitelist.create({data:{domain,brand,category}});return NextResponse.json({success:true,data:item})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add admin whitelist management API endpoint
