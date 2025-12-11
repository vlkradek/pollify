import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const {userId} = await req.json();

    const vote = await prisma.vote.findFirst({
        where: {
            pollId: parseInt(id),
            userId: userId,
        },

    })
    return NextResponse.json(vote, {status: 200});
}