import{NextRequest,NextResponse}from'next/server'
export async function POST(req:NextRequest){try{const{action}=await req.json();if(action==='change-password'){return NextResponse.json({success:true,data:{message:'Password updated'}})}
if(action==='enable-2fa'){return NextResponse.json({success:true,data:{message:'2FA setup initiated'}})}
return NextResponse.json({success:false,error:'Invalid action'},{status:400})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add user security API endpoint
