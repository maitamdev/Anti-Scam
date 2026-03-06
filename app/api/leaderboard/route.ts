import{NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(){try{const users=await prisma.communityContribution.groupBy({by:['userId'],_sum:{points:true},orderBy:{_sum:{points:'desc'}},take:50});return NextResponse.json({success:true,data:users})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add community leaderboard API endpoint
