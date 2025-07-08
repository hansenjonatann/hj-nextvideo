export const runtime = "nodejs";   // 🚀 ini wajib supaya bukan Edge

import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export const POST = async (req: NextRequest) => {
  const form = await req.formData()
  const file = form.get('file') as File

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const result = await new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { resource_type: "video" },
      (err, result) => {
        if (err) reject(err)
        else resolve(result)
      }
    )
    upload.end(buffer)
  })

  await db.video.create({
    data: {
      title: form.get("title") as string,
      url: (result as any).secure_url,
    }
  })

  return NextResponse.json({ message: "Uploaded", url: (result as any).secure_url })
}
