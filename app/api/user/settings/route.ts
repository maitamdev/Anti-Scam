import{NextRequest,NextResponse}from'next/server'
export async function GET(){return NextResponse.json({success:true,data:{theme:'system',language:'vi',emailNotifications:true,pushNotifications:false}})}
export async function PUT(req:NextRequest){try{const settings=await req.json();return NextResponse.json({success:true,data:settings})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add user settings API endpoint
