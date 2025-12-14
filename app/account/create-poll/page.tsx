"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


export default function CreatePollPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [options, setOptions] = useState(["", ""])

  const router = useRouter();

  const { data: session } = useSession();
  console.log("Session data:", session);
  const creatorId = session?.user?.id

  const addOption = () => {
    if (options.length < 10) {
      setOptions([...options, ""])
    }
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, options, creatorId  }),
    })
    if (res.ok) {
        router.push("/account");
        
    } else {
        console.error("Failed to create poll")
    }


    console.log(res)
    // TODO: Implement poll creation logic
    console.log("[v0] Creating poll:", { title, description, options: options.filter((o) => o.trim()) })
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/polls"
          className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to polls
        </Link>

        {/* Form Card */}
        <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
          <h1 className="mb-2 font-sans text-3xl font-bold text-card-foreground">Create a New Poll</h1>
          <p className="mb-8 text-muted-foreground">Gather opinions from the community by creating your poll</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium text-foreground">
                Poll Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="What's your question?"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Provide more context for your poll..."
              />
            </div>

            {/* Options */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Poll Options</label>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      required
                      className="h-10 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder={`Option ${index + 1}`}
                    />
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-input hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add option button */}
              {options.length < 10 && (
                <button
                  type="button"
                  onClick={addOption}
                  className="mt-3 inline-flex h-9 items-center rounded-lg border border-dashed border-input px-4 text-sm font-medium text-foreground hover:bg-accent"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Option
                </button>
              )}
              <p className="mt-2 text-xs text-muted-foreground">Add at least 2 options, maximum 10</p>
            </div>

            {/* Submit button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="h-10 flex-1 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
              >
                Create Poll
              </button>
              <Link
                href="/polls"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-6 text-sm font-medium hover:bg-accent"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
     