import{NextRequest,NextResponse}from'next/server'
export async function POST(req:NextRequest){try{const events=await req.json();return NextResponse.json({success:true,data:{received:Array.isArray(events)?events.length:1}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add analytics events tracking API endpoint
