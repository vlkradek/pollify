// "use client"

import { auth } from "@/auth"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export async function Navbar() {
  // const [searchQuery, setSearchQuery] = useState("")

  const session = await auth()

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
          <img src="/text-logo.svg" className="h-10" alt="" />
            {/* <Image src="/text-logo.svg" alt="Pollify Logo" width={100} height={50} /> */}
            {/* <span className="font-sans text-xl font-bold text-foreground">Pollify</span> */}
          </Link>

          {/* <div className="hidden flex-1 max-w-md md:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search polls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-md border-2 border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
              />
              <svg
                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div> */}

          <div className="flex items-center gap-5">
            <Link
              href="/polls"
              className="hidden text-sm font-semibold text-foreground hover:text-primary transition-colors sm:inline-block"
            >
              Všechny ankety
            </Link>
            <Link
              href="/login"
              className="rounded-md border-2 border-primary/30 bg-background px-5 py-2 text-sm font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              {session ? "Můj účet" : "Přihlásit se"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
