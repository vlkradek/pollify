// app/api/account/delete/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    await prisma.$transaction([
      // 1. Delete sessions
      prisma.session.deleteMany({
        where: { userId },
      }),

      // 2. Delete OAuth accounts (Google)
      prisma.account.deleteMany({
        where: { userId },
      }),

      // 3. Delete app-specific data (EXAMPLE)
      // prisma.poll.deleteMany({ where: { userId } }),
      // prisma.vote.deleteMany({ where: { userId } }),

      // 4. Delete user
      prisma.user.delete({
        where: { id: userId },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Account deletion failed:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
