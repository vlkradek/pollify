// "use client"

import { auth } from "@/auth"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export async function Navbar() {

  const session = await auth()

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/text-logo.svg" className="h-10" alt="" />
          </Link>

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
