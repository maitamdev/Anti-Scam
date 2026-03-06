import{NextRequest,NextResponse}from'next/server'
export async function GET(req:NextRequest){const page=parseInt(req.nextUrl.searchParams.get('page')||'1');const limit=parseInt(req.nextUrl.searchParams.get('limit')||'10');return NextResponse.json({success:true,data:[],meta:{page,limit,total:0,totalPages:0}})}feat: add blog posts listing API endpoint
