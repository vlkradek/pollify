import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

const CreateVoteParamsSchema = z.object({
    id: z.string().regex(/^\d+$/),
})

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    
    try {
        const { id } = await params;

        CreateVoteParamsSchema.parse({ id });

        const body = await request.json();
        const { optionId, userId } = body;

        const existingVote = await prisma.vote.findUnique({
            where: {
                userId_pollId: {
                    userId,
                    pollId: parseInt(id),
                },
            },
        });

        if (existingVote) {
            return NextResponse.json(
                { error: "Uživatel již hlasoval" },
                { status: 400 }
            );
        } else {
            await prisma.vote.create({
                data: {
                    userId,
                    pollId: parseInt(id),
                    optionId,
                },
            });
        }

        const poll = await prisma.poll.findUnique({
            where: { id: parseInt(id) },
            include: {
                options: {
                    include: {
                        votes: true,
                    },
                },
            },
        });

        return NextResponse.json({ poll }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Selhání při vytváření hlasu" },
            { status: 500 }
        );
    }
}

