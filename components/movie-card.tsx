"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Movie } from "@/lib/tmdb"
import { useMyList } from "@/lib/my-list-context"
import { Plus, Check } from 'lucide-react'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter()
  const { isInMyList, addToMyList, removeFromMyList } = useMyList()
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  const handleClick = () => {
    router.push(`/movie/${movie.id}`)
  }

  const handleMyListClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isInMyList(movie.id)) {
      removeFromMyList(movie.id)
    } else {
      addToMyList(movie)
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
            src={movie.poster_path ? imageUrl : "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover transition-all hover:scale-105"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleMyListClick}
          >
            {isInMyList(movie.id) ? (
              <Check className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{movie.title}</h3>
          <p className="text-sm text-muted-foreground">
            {new Date(movie.release_date).getFullYear()}
            {' · '}
            {movie.vote_average.toFixed(1)} ⭐️
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

