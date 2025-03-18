"use client"

import { useMyList } from "@/lib/my-list-context"
import { MediaCard } from "@/components/media-card"

export default function MyListPage() {
  const { myList } = useMyList()

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My List</h1>
      {myList.length === 0 ? (
        <p>Your list is empty. Add some movies to get started!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myList.map((media) => (
            <MediaCard key={media.id} media={media} />
          ))}
        </div>
      )}
    </div>
  )
}

