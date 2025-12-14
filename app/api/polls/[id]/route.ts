import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: pollId } = await params;
    const votes = await prisma.vote.deleteMany({
        where: {
            pollId: parseInt(pollId),
        },
    });
    const options = await prisma.option.deleteMany({
        where: {
            pollId: parseInt(pollId),
        },
    });
    const poll = await prisma.poll.delete({
        where: {
            id: parseInt(pollId),
        },
    });
    return NextResponse.json({ message: "Poll and related data deleted successfully." });

}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: pollId } = await params;
    const { isActive } = await req.json();
    const updatedPoll = await prisma.poll.update({
        where: {
            id: parseInt(pollId),
        },
        data: {
            isActive,
        },
    });
    return NextResponse.json(updatedPoll);
}
