// app/upload/page.tsx
'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const router = useRouter()

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)

    await fetch("/api/upload", {
      method: "POST",
      body: formData
    })

    router.push('/')
    
  }

  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Video Title"
        className="border p-2 w-full"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2">
        Upload
      </button>
    </div>
  )
}
