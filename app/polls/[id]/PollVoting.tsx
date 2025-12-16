"use client";

import Loading from "@/components/loading";
import ShareButton from "@/components/ShareButton";
import { PollFullType } from "@/lib/schemas";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const PollVoting = ({ poll, userId, hasVoted }: { poll: PollFullType, userId: string | null, hasVoted: boolean }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const { data: session } = useSession();
    const [showResults, setShowResults] = useState<boolean>(poll.creatorId === userId || hasVoted);
    const [currentPoll, setCurrentPoll] = useState<PollFullType>(poll);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const totalVotes = currentPoll.options.reduce(
        (sum, opt) => sum + opt.votes.length,
        0
    );

    const handleVote = async () => {
        if (!session) {
            toast.warning("Pro hlasování je potřeba se přihlásit", {
                description: <Link href="/login" className="underline font-bold text-blue-900">Přihlásit se</Link>,
            });
            setIsLoading(false);
        }
        if (selectedOption !== null) {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/polls/${poll.id}/vote`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        optionId: selectedOption,
                        userId: session?.user?.id,
                    }),
                });

                if (response.ok) {
                    setShowResults(true);
                    const data = await response.json();
                    setCurrentPoll(data.poll);
                }
            } catch (error) {
                console.error("Error submitting vote:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };
    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-3xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
                <Link
                    href="/polls"
                    className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                    <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Zpět na ankety
                </Link>
                {poll.creatorId === userId && (
                    <p className="w-full border-2 text-sm px-5 py-3 mb-4 border-primary/80 bg-primary/10 rounded-md">
                        Tohle je vaše anketa. Nemůžete hlasovat ve vlastní anketě, ale můžete vidět výsledky.
                    </p>
                )}

                <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
                    <h1 className="mb-3 text-balance font-sans text-3xl font-bold text-card-foreground">
                        {poll.title}
                    </h1>
                    <p className="mb-8 text-muted-foreground">
                        {poll.description}
                    </p>

                    <div className="mb-6 space-y-3">
                        {currentPoll.options.map((option) => {
                            const percentage =
                                totalVotes > 0
                                    ? (option.votes.length / totalVotes) * 100
                                    : 0;
                            const isSelected = selectedOption === option.id;

                            return (
                                <button
                                    key={option.id}
                                    onClick={() =>
                                        !showResults &&
                                        setSelectedOption(option.id)
                                    }
                                    disabled={showResults}
                                    className={`relative w-full overflow-hidden rounded-lg border p-4 text-left transition-all ${
                                        showResults
                                            ? "cursor-default"
                                            : isSelected
                                            ? "border-foreground bg-accent"
                                            : "border-border hover:border-foreground/50"
                                    }`}
                                >
                                    {showResults && (
                                        <div
                                            className="absolute inset-0 bg-accent/30"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    )}

                                    <div className="relative flex items-center justify-between">
                                        <span className="font-medium text-foreground">
                                            {option.text}
                                        </span>
                                        {showResults && (
                                            <span className="text-sm text-muted-foreground">
                                                {option.votes.length} votes (
                                                {percentage.toFixed(1)}%)
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {!showResults && (
                        <button
                            onClick={handleVote}
                            disabled={selectedOption === null}
                            className="h-10 w-full rounded-lg bg-primary px-4 text-sm font-medium cursor-pointer text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loading /> : "Hlasovat"}
                        </button>
                    )}

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        {totalVotes} celkem hlasů
                    </p>
                </div>
                <ShareButton pollId={poll.id} pollTitle={poll.title} />
            </div>
        </main>
    );
};

export default PollVoting;
