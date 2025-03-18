"use client"

import { useState, useEffect } from "react"
import { getMediaVideos } from "@/lib/tmdb"
import YouTube from "react-youtube"

interface VideoPlayerProps {
  movieId: string
  mediaType: 'movie' | 'tv'
}

export function VideoPlayer({ movieId, mediaType }: VideoPlayerProps) {
  const [videoKey, setVideoKey] = useState<string | null>(null)

  useEffect(() => {
    getMediaVideos(movieId, mediaType).then((videos) => {
      const trailer = videos.find((video) => video.type === "Trailer" && video.site === "YouTube")
      if (trailer) {
        setVideoKey(trailer.key)
      }
    })
  }, [movieId, mediaType])

  if (!videoKey) {
    return null
  }

  return (
    <div className="aspect-video">
      <YouTube
        videoId={videoKey}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0,
          },
        }}
      />
    </div>
  )
}

