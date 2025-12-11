import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma"



export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const body = await request.json();
        const { optionId, userId } = body;

        // Check if user already voted
        const existingVote = await prisma.vote.findUnique({
            where: {
                userId_pollId: {
                    userId,
                    pollId: parseInt(id),
                },
            },
        });

        if (existingVote) {
            // Update existing vote
            return NextResponse.json(
                { error: "User has already voted" },
                { status: 400 }
            );
        } else {
            // Create new vote
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
            { error: "Failed to record vote" },
            { status: 500 }
        );
    }

    // MOCK RESPONSE (remove when using Prisma):
}
