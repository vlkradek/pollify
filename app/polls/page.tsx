import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PollFullType } from "@/lib/schemas";
import Link from "next/link";

export default async function AllPollsPage() {

    const session = await auth();
    const polls: PollFullType[] = await prisma.poll.findMany({
        include: {
            options: {
                include: {
                    votes: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
  


    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-2 font-sans text-4xl font-bold text-foreground">
                        All Active Polls
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Browse and vote on community polls
                    </p>
                </div>

                {polls.length === 0 ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <p className="mb-4 text-muted-foreground">
                                No polls found
                            </p>
                            <Link
                                href="/create-poll"
                                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                            >
                                Create First Poll
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {polls.map((poll) => (
                            <Link
                                key={poll.id}
                                href={`/polls/${poll.id}`}
                                className="group rounded-lg relative border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-lg"
                            >
                                {session?.user?.id === poll.creatorId && (
                                    <span className="absolute top-3 right-3 text-xs bg-primary/60 text-white px-2 py-1 rounded-md">
                                        Vytvořeno vámi
                                    </span>
                                )}
                                <h3 className="mb-2 text-balance font-sans text-lg font-semibold text-card-foreground group-hover:text-foreground">
                                    {poll.title}
                                </h3>
                                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                                    {poll.description}
                                </p>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>{poll.options.reduce((acc, option) => acc + option.votes.length, 0)} votes</span>
                                    <span>{poll.options.length} options</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
