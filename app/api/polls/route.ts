import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import z from "zod";

export const CreatePollSchema = z.object({
  title: z.string().min(1, "Název ankety je povinný a nesmí být prázdný.").max(255, "Název ankety nesmí být delší než 255 znaků."),
  description: z.string().max(1000, "Popis ankety nesmí být delší než 1000 znaků.").optional(),
  options: z.array(z.string().min(1, "Každá možnost musí mít alespoň 1 znak.").max(255, "Každá možnost nesmí mít více než 255 znaků."))
    .min(2, "Musíte přidat alespoň 2 možnosti.")
    .max(10, "Maximální počet možností je 10."),
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
