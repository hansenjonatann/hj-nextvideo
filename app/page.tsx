'use client'
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
      {videos.map((v : any) => (
        <div key={v.id}>
          <h2 className="font-bold text-xl">{v.title}</h2>
          <video src={v.url} controls className="w-full h-auto" />
        </div>
      ))}
    </div>
  )
}
