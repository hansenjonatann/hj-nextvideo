import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export const GET = async () => {
  const videos = await db.video.findMany({
    orderBy: {createdAt: 'desc'}
  })

  return NextResponse.json({
    success: true , 
    message: 'List of videos',
    data: videos 
  })
}