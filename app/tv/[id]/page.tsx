"use client"

import { useEffect, useState } from 'react'
import Image from "next/image"
import { notFound, useRouter } from "next/navigation"
import { VideoPlayer } from "@/components/video-player"
import { getMediaDetails, Media } from "@/lib/tmdb"
import { Button } from "@/components/ui/button"
import { useMyList } from "@/lib/my-list-context"
import { Plus, Check } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

export default function TVShowPage({ params }: { params: { id: string } }) {
  const [show, setShow] = useState<Media | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { isInMyList, addToMyList, removeFromMyList } = useMyList()
  const router = useRouter()

  useEffect(() => {
    const fetchShow = async () => {
      try {
        setIsLoading(true)
        const showData = await getMediaDetails(params.id, 'tv')
        setShow(showData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
      } finally {
        setIsLoading(false)
      }
    }
    fetchShow()
  }, [params.id])

  useEffect(() => {
    if (error) {
      notFound()
    }
  }, [error])

  if (isLoading) {
    return <TVShowSkeleton />
  }

  if (!show) return null

  const backdropUrl = `https://image.tmdb.org/t/p/original${show.backdrop_path}`
  const posterUrl = `https://image.tmdb.org/t/p/w500${show.poster_path}`

  const handleMyListClick = () => {
    if (isInMyList(show.id)) {
      removeFromMyList(show.id)
    } else {
      addToMyList(show)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative aspect-[2.76/1] w-full mb-8 rounded-lg overflow-hidden">
        <Image
          src={show.backdrop_path ? backdropUrl : "/placeholder.svg"}
          alt={show.name || ""}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/0" />
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
          <Image
            src={show.poster_path ? posterUrl : "/placeholder.svg"}
            alt={show.name || ""}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{show.name}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>{new Date(show.first_air_date || "").getFullYear()}</span>
            <span>{show.vote_average.toFixed(1)} ⭐️</span>
          </div>
          {show.genres && (
            <div className="flex flex-wrap gap-2">
              {show.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full bg-primary/10 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
          <p className="text-lg leading-relaxed">{show.overview}</p>
          <Button onClick={handleMyListClick}>
            {isInMyList(show.id) ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Remove from My List
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add to My List
              </>
            )}
          </Button>
          <VideoPlayer movieId={params.id} mediaType="tv" />
        </div>
      </div>
    </div>
  )
}

function TVShowSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="aspect-[2.76/1] w-full mb-8 rounded-lg" />
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <Skeleton className="aspect-[2/3] rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  )
}

