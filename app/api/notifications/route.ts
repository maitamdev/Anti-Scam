import{NextRequest,NextResponse}from'next/server'
import{getServerSession}from'next-auth'
export async function GET(req:NextRequest){try{return NextResponse.json({success:true,data:[],meta:{unread:0}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}
export async function PATCH(req:NextRequest){try{const{ids}=await req.json();return NextResponse.json({success:true,data:{marked:ids?.length||0}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add notifications API endpoint
