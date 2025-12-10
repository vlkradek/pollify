import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { useState } from "react";
import PollVoting from "./PollVoting";
import { PollFullType } from "@/lib/schemas";

interface Option {
    id: number;
    text: string;
    votes: number;
}

// Mock poll data
const MOCK_POLLS: Record<
    string,
    { title: string; description: string; options: Option[] }
> = {
    "1": {
        title: "Best programming language for beginners?",
        description:
            "Help newcomers choose their first programming language to learn",
        options: [
            { id: 1, text: "Python", votes: 542 },
            { id: 2, text: "JavaScript", votes: 423 },
            { id: 3, text: "Java", votes: 198 },
            { id: 4, text: "C++", votes: 84 },
        ],
    },
    "2": {
        title: "Should remote work be the default?",
        description: "Share your thoughts on the future of work culture",
        options: [
            { id: 1, text: "Yes, fully remote", votes: 356 },
            { id: 2, text: "Hybrid model", votes: 421 },
            { id: 3, text: "No, office-based", votes: 115 },
        ],
    },
    "3": {
        title: "Most important skill for developers in 2025",
        description: "What skill should developers focus on this year?",
        options: [
            { id: 1, text: "AI/ML Integration", votes: 789 },
            { id: 2, text: "System Design", votes: 654 },
            { id: 3, text: "Cloud Architecture", votes: 432 },
            { id: 4, text: "DevOps", votes: 228 },
        ],
    },
};

export default async function PollPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

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
    if (!poll) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="mb-2 text-2xl font-bold text-foreground">
                        Poll not found
                    </h1>
                    <p className="mb-4 text-muted-foreground">
                        This poll doesnt exist
                    </p>
                    <Link
                        href="/polls"
                        className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Back to Polls
                    </Link>
                </div>
            </main>
        );
    }

    // Using mock data for now

    return <PollVoting poll={poll as PollFullType} />;
}
