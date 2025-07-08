import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import path from "path"



export const POST = async (req: NextRequest) => {
  const data = await req.formData()
  const file = data.get('file') as File
  const title = data.get('title') as string 

  if(!file || !title) {
    return NextResponse.json({
      success: false , 
      message: 'Invalid Input',
      statusCode: 400
    })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const fileName = `${Date.now()}-${file.name}`
  const uploadPath = path.join(process.cwd()  , 'public' , 'uploads' , fileName)

  const fileUrl = `/uploads/${fileName}`

  const video = await db.video.create({
    data: {
      title , 
      url: fileUrl
    }
  })

  return NextResponse.json({
    success: true, 
    message: 'Video uploaded',
    data: video
  })
}