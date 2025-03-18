"use client"

import { useState, useEffect } from "react"
import { MediaCard } from "./media-card"
import { getTrendingMedia, getPopularMedia, getMediaByGenre } from "@/lib/tmdb"
import type { Media } from "@/lib/tmdb"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"

interface MediaGridProps {
  type: "trending" | "popular" | "genre"
  mediaType: "movie" | "tv"
  genreId?: number
}

export function MediaGrid({ type, mediaType, genreId }: MediaGridProps) {
  const [media, setMedia] = useState<Media[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { ref, inView } = useInView()

  const loadMedia = async () => {
    let newMedia: Media[] = []
    switch (type) {
      case "trending":
        newMedia = (await getTrendingMedia(mediaType)).results
        break
      case "popular":
        newMedia = (await getPopularMedia(mediaType)).results
        break
      case "genre":
        if (genreId) {
          newMedia = (await getMediaByGenre(genreId, mediaType, page)).results
        }
        break
    }
    setMedia((prevMedia) => {
      const uniqueMedia = newMedia.filter(
        (newItem) => !prevMedia.some((prevItem) => prevItem.id === newItem.id)
      )
      if (uniqueMedia.length === 0) setHasMore(false)
      return [...prevMedia, ...uniqueMedia]
    })
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    setMedia([])
    setPage(1)
    setHasMore(true)
    loadMedia()
  }, [type, mediaType, genreId])

  useEffect(() => {
    if (inView && hasMore) {
      loadMedia()
    }
  }, [inView])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map((item, index) => (
          <MediaCard key={`${item.id}-${index}`} media={item} />
        ))}
      </div>
      {hasMore && (
        <div ref={ref} className="flex justify-center">
          <Button onClick={loadMedia}>Load More</Button>
        </div>
      )}
    </div>
  )
}

