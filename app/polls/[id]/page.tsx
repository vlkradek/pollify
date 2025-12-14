import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PollVoting from "./PollVoting";
import { PollFullType } from "@/lib/schemas";
import { auth } from "@/auth";
import { Vote } from "@prisma/client";

export async function generateMetadata({ params }:{ params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const pollData = await prisma.poll.findUnique({
    where: { id: parseInt(id) },
    select: {
      title: true,
    },
  });
  
  return {
    title: `${pollData?.title} | Pollify`,
    description: `Hlasujte v anketě: ${pollData?.title}`,
  };
}

export default async function PollPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const session = await auth();

    const poll: PollFullType | null = await prisma.poll.findUnique({
        where: { id: parseInt(id) },
        include: {
            options: {
                include: {
                    votes: true,
                },
            },
        },
    });

    const userVote: Vote | null = await prisma.vote.findFirst({
        where: {
            pollId: parseInt(id),
            userId: session?.user?.id || "",
        },
    });

    const viewable = poll && (poll.isActive || poll.creatorId === session?.user?.id);
    if (!viewable) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="mb-2 text-2xl font-bold text-foreground">
                        Anketa nenalezena
                    </h1>
                    <p className="mb-4 text-muted-foreground">
                        Tato anketa nebyla nalezena nebo je neaktivní.
                    </p>
                    <Link
                        href="/polls"
                        className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Zpět na ankety
                    </Link>
                </div>
            </main>
        );
    }


    return (
        <>
            {/* <main className="bg-background mx-auto max-w-3xl mt-12 sm:px-6 lg:px-8">
                {poll.creatorId === session?.user?.id && (
                    <p className="w-full border-2 text-sm px-5 py-3 mb-4 border-primary/80 bg-primary/10 rounded-md">
                        Tohle je vaše anketa. Nemůžete hlasovat ve vlastní
                        anketě, ale můžete vidět výsledky.
                    </p>
                    )}
            </main> */}

            <PollVoting
                poll={poll as PollFullType}
                userId={session?.user?.id ?? null}
                hasVoted={userVote !== null}
            />
        </>
    );
}
