"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Media } from "@/lib/tmdb"
import { useMyList } from "@/lib/my-list-context"
import { Plus, Check } from 'lucide-react'

interface MediaCardProps {
  media: Media
}

export function MediaCard({ media }: MediaCardProps) {
  const router = useRouter()
  const { isInMyList, addToMyList, removeFromMyList } = useMyList()
  const imageUrl = `https://image.tmdb.org/t/p/w500${media.poster_path}`

  const handleClick = () => {
    router.push(`/${media.media_type}/${media.id}`)
  }

  const handleMyListClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isInMyList(media.id)) {
      removeFromMyList(media.id)
    } else {
      addToMyList(media)
    }
  }

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[2/3]">
          <Image
            src={media.poster_path ? imageUrl : "/placeholder.svg"}
            alt={media.title || media.name || ""}
            fill
            className="object-cover transition-all hover:scale-105"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleMyListClick}
          >
            {isInMyList(media.id) ? (
              <Check className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{media.title || media.name}</h3>
          <p className="text-sm text-muted-foreground">
            {new Date(media.release_date || media.first_air_date || "").getFullYear()}
            {' · '}
            {media.vote_average.toFixed(1)} ⭐️
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

