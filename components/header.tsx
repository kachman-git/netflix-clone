import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SearchBar } from './search-bar'
import { ThemeToggle } from './theme-toggle'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-red-600">NETFLIX</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4 ml-6">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/tv-shows">TV Shows</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/movies">Movies</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/my-list">My List</Link>
          </Button>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>
                Access main navigation options here.
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col space-y-4">
              <Button variant="ghost" asChild>
                <Link href="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/tv-shows">TV Shows</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/movies">Movies</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/my-list">My List</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="ml-auto flex items-center space-x-4">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

