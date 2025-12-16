import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Neoprávněná operace" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    await prisma.$transaction([
      prisma.session.deleteMany({
        where: { userId },
      }),

      prisma.account.deleteMany({
        where: { userId },
      }),

      prisma.user.delete({
        where: { id: userId },
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Vymazání účtu selhalo:", error);
    return NextResponse.json(
      { error: "Selhání při mazání účtu" },
      { status: 500 }
    );
  }
}
