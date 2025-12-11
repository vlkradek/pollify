import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

const mockPolls = [
  {
    id: 1,
    title: "What is your favorite programming language?",
    description: "Help us understand the developer community preferences",
    votes: 342,
  },
  {
    id: 2,
    title: "Best time for team meetings?",
    description: "Vote for your preferred meeting time slot",
    votes: 127,
  },
  {
    id: 3,
    title: "Which feature should we build next?",
    description: "Your vote will help prioritize our roadmap",
    votes: 89,
  },
  {
    id: 4,
    title: "Preferred working style?",
    description: "Remote, hybrid, or office-based?",
    votes: 256,
  },
]

export async function GET() {
  // Simulate a small delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    polls: mockPolls,
    total: mockPolls.length,
  })
}

export async function POST(request: Request) {
  // PRISMA IMPLEMENTATION (uncomment when database is ready):
  try {
    const body = await request.json()
    const { title, description, options, creatorId } = body
  
    const poll = await prisma.poll.create({
      data: {
        title,
        description,
        creator: {
          connect: { id: creatorId }
        },
        options: {
          create: options.map((text: string) => ({ text }))
        }
      },
      include: {
        options: true
      },
      
    })
  
    return NextResponse.json(poll, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create poll" },
      { status: 500 }
    )
  }

  // MOCK RESPONSE (remove when using Prisma):
}