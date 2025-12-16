import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

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
