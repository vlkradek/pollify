import { prisma } from "@/lib/prisma";
import { PollFullType } from "@/lib/schemas";
import Link from "next/link";

export default async function HomePage() {
    const topPolls: PollFullType[] = await prisma.poll.findMany({
        where: {
            isActive: true,
        },
        include: {
            options: {
                include: {
                    votes: true,
                },
            },
        },
        orderBy: { votes: {
            _count: "desc"
        } },
        take: 4,
    });

    return (
        <main className="min-h-screen">
            <section className="relative overflow-hidden border-b border-border bg-linear-to-br from-primary/10 via-accent to-secondary">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="/abstract-colorful-gradient-flowing-shapes-orange-p.jpg"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-6 font-sans text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-6xl">
                            Rychlé ankety pro každého
                        </h1>
                        <p className="mb-8 text-balance text-lg text-foreground/80 lg:text-xl">
                            Vytvářejte ankety během několika sekund, sdílejte je
                            s ostatními a sledujte výsledky v reálném čase bez
                            zbytečné složitosti.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="/signup"
                                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all"
                            >
                                Vytvořit anketu
                            </Link>
                            <Link
                                href="/polls"
                                className="inline-flex h-12 items-center justify-center rounded-md border-2 border-primary/30 bg-background/80 backdrop-blur-sm px-8 text-sm font-semibold hover:bg-accent transition-all"
                            >
                                Procházet ankety
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-border bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <h2 className="mb-12 text-center font-sans text-3xl font-bold text-foreground">
                        Proč používat Pollify?
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg">
                                    <svg
                                        className="h-7 w-7"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="mb-2 font-sans text-xl font-semibold text-foreground">
                                Jednoduché ovládání
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Pollify je navrženo tak, aby ho mohl používat
                                opravdu každý. Vytvoření ankety zabere jen pár
                                sekund a nevyžaduje žádné technické znalosti.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg">
                                    <svg
                                        className="h-7 w-7"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="mb-2 font-sans text-xl font-semibold text-foreground">
                                Zdarma k použití
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Pollify můžeš používat bez poplatků. Základní
                                funkce jsou dostupné zdarma, bez časového
                                omezení a bez nutnosti zadávat platební údaje.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg">
                                    <svg
                                        className="h-7 w-7"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="mb-2 font-sans text-xl font-semibold text-foreground">
                                Rychlé výsledky
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Hlasy se počítají okamžitě a výsledky vidíš v
                                reálném čase. Máš tak vždy aktuální přehled bez
                                nutnosti stránku obnovovat.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-background">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="font-sans text-3xl font-bold text-foreground">
                            Vybrané ankety
                        </h2>
                        <Link
                            href="/polls"
                            className="text-sm font-semibold text-primary hover:text-primary/80"
                        >
                            Procházet všechny →
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {topPolls.map((poll) => (
                            <Link
                                key={poll.id}
                                href={`/polls/${poll.id}`}
                                className="group rounded-md border-2 border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                            >
                                <h3 className="mb-4 text-balance font-sans text-lg font-semibold text-card-foreground group-hover:text-primary">
                                    {poll.title}
                                </h3>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>{(() => {
                                        const totalVotes = poll.options.reduce((acc, option) => acc + option.votes.length, 0);
                                        if (totalVotes === 1) {
                                            return "1 hlas";
                                        } else if(totalVotes === 2){
                                            return `${totalVotes} hlasy`;
                                        } else {
                                            return `${totalVotes} hlasů`;
                                        }
                                    })()}</span>
                                    <span>
                                        {poll.options.length}{" "}
                                        {poll.options.length === 1 ? "možnost" : poll.options.length >= 2 && poll.options.length <= 4 ? "možnosti" : "možností"}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-border bg-gradient-to-br from-primary/5 via-accent/30 to-secondary/20">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="mb-4 font-sans text-3xl font-bold text-foreground lg:text-4xl">
                            Připraveni vytvořit svou první anketu?
                        </h2>

                        <p className="mb-8 text-balance text-lg text-foreground/80">
                            Vytvoření ankety zabere jen pár sekund. Pollify
                            můžete začít používat zdarma, bez složitého
                            nastavování.
                        </p>

                        <Link
                            href="/login"
                            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all"
                        >
                            Vytvořit účet
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
