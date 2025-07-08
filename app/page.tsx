'use client'
import Link from "next/link"
import { useEffect, useState } from "react"



export default  function VideosPage() {

  const [videos,  setVideos] = useState([])

  const fetchVideos = async () => {
    const res = await fetch('/api/video')
    const data = await res.json()

    console.log(data)
    setVideos(data.data)
  }

  useEffect(() => {
    fetchVideos()
  } , [])


  return (
    <div className="space-y-8 p-4">
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
       {videos.map((v : any) => (
        <div key={v.id}>
          <h2 className="font-bold text-xl">{v.title}</h2>
          <video src={v.url} controls className="w-full mt-8 h-auto" />
        </div>
      ))}
 </div>

      <div className="fixed bottom-4 right-3 bg-blue-600 w-12 h-12 flex justify-center items-center rounded-full">
        <Link href={'/upload'} className="text-3xl">+</Link>
      </div>
    </div>
  )
}
