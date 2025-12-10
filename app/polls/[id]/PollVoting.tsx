"use client";

import { PollFullType } from "@/lib/schemas";
import { Option, Poll, Vote } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

const PollVoting = ({ poll }: { poll: PollFullType }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [hasVoted, setHasVoted] = useState(false);

    const totalVotes = poll.options.reduce(
        (sum, opt) => sum + opt.votes.length,
        0
    );

    const handleVote = async () => {
        if (selectedOption !== null) {
            // Uncomment below to submit vote to database
            /*
        try {
          const response = await fetch(`/api/polls/${pollId}/vote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              optionId: selectedOption,
              userId: 1 // Replace with actual user ID from session
            }),
          })
          
          if (response.ok) {
            setHasVoted(true)
            // Optionally refresh poll data with router.refresh()
          }
        } catch (error) {
          console.error('Error submitting vote:', error)
        }
        */

            // Mock behavior for now
            setHasVoted(true);
        }
    };
    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
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
                    Back to all polls
                </Link>

                <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
                    <h1 className="mb-3 text-balance font-sans text-3xl font-bold text-card-foreground">
                        {poll.title}
                    </h1>
                    <p className="mb-8 text-muted-foreground">
                        {poll.description}
                    </p>

                    <div className="mb-6 space-y-3">
                        {poll.options.map((option) => {
                            const percentage =
                                totalVotes > 0
                                    ? (option.votes.length / totalVotes) * 100
                                    : 0;
                            const isSelected = selectedOption === option.id;

                            return (
                                <button
                                    key={option.id}
                                    onClick={() =>
                                        !hasVoted &&
                                        setSelectedOption(option.id)
                                    }
                                    disabled={hasVoted}
                                    className={`relative w-full overflow-hidden rounded-lg border p-4 text-left transition-all ${
                                        hasVoted
                                            ? "cursor-default"
                                            : isSelected
                                            ? "border-foreground bg-accent"
                                            : "border-border hover:border-foreground/50"
                                    }`}
                                >
                                    {hasVoted && (
                                        <div
                                            className="absolute inset-0 bg-accent/30"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    )}

                                    <div className="relative flex items-center justify-between">
                                        <span className="font-medium text-foreground">
                                            {option.text}
                                        </span>
                                        {hasVoted && (
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

                    {!hasVoted && (
                        <button
                            onClick={handleVote}
                            disabled={selectedOption === null}
                            className="h-10 w-full rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Vote
                        </button>
                    )}

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        {totalVotes} total votes
                    </p>
                </div>
            </div>
        </main>
    );
};

export default PollVoting;
