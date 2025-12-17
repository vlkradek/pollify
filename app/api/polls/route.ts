import { prisma } from "@/lib/prisma"
import { CreatePollSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server"
import z from "zod";




export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    CreatePollSchema.parse(body);

    const { title, description, options, creatorId } = body;

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
      { error: "Selhání při vytváření ankety" },
      { status: 500 }
    )
  }
}
