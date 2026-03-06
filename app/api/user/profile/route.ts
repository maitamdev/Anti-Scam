import{NextRequest,NextResponse}from'next/server'
export async function GET(){return NextResponse.json({success:true,data:{name:'User',email:'user@example.com'}})}
export async function PUT(req:NextRequest){try{const profile=await req.json();return NextResponse.json({success:true,data:profile})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add user profile API endpoint
