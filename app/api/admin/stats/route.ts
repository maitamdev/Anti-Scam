import{NextResponse}from'next/server'
import prisma from'@/app/lib/db'
export async function GET(){try{const[totalUsers,totalScans,totalReports,totalBlocked]=await Promise.all([prisma.user.count(),prisma.scan.count(),prisma.report.count(),prisma.blocklist.count()]);return NextResponse.json({success:true,data:{totalUsers,totalScans,totalReports,totalBlocked,timestamp:new Date().toISOString()}})}catch{return NextResponse.json({success:false,error:'Server error'},{status:500})}}feat: add admin dashboard statistics API endpoint
