import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const ManagePollParamsSchema = z.object({
    id: z.string().regex(/^\d+$/),
});

export async function DELETE({ params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        ManagePollParamsSchema.parse({ id });

        const votes = await prisma.vote.deleteMany({
            where: {
                pollId: parseInt(id),
            },
        });
        const options = await prisma.option.deleteMany({
            where: {
                pollId: parseInt(id),
            },
        });
        const poll = await prisma.poll.delete({
            where: {
                id: parseInt(id),
            },
        });
        return NextResponse.json({
            message: "Anketa a související data byla úspěšně smazána.",
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Selhání při mazání ankety" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        ManagePollParamsSchema.parse({ id });

        const { isActive } = await req.json();
        const updatedPoll = await prisma.poll.update({
            where: {
                id: parseInt(id),
            },
            data: {
                isActive,
            },
        });
        return NextResponse.json(updatedPoll, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Selhání při aktualizaci ankety" },
            { status: 500 }
        );
    }
}
