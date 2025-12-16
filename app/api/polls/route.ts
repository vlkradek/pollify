import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import z from "zod";

const CreatePollSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().max(1000).optional(),
    options: z.array(z.string().min(1).max(255)).min(2).max(10),
    creatorId: z.string().regex(/^[a-z0-9]{25}$/),
});

export async function POST(request: Request) {
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
