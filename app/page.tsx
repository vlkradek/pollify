import Link from "next/link"

export default function HomePage() {
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
              Democratic polling for everyone
            </h1>
            <p className="mb-8 text-balance text-lg text-foreground/80 lg:text-xl">
              Create polls, gather opinions, and make decisions together. Join thousands of users making their voices
              heard on Pollify.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all"
              >
                Get Started
              </Link>
              <Link
                href="/polls"
                className="inline-flex h-12 items-center justify-center rounded-md border-2 border-primary/30 bg-background/80 backdrop-blur-sm px-8 text-sm font-semibold hover:bg-accent transition-all"
              >
                Explore Polls
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-sans text-3xl font-bold text-foreground">Why Choose Pollify</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 font-sans text-xl font-semibold text-foreground">Easy to Create</h3>
              <p className="text-sm text-muted-foreground">
                Build professional polls in seconds with our intuitive interface
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 font-sans text-xl font-semibold text-foreground">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Connect with a vibrant community and discover trending topics
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 font-sans text-xl font-semibold text-foreground">Real-time Results</h3>
              <p className="text-sm text-muted-foreground">Watch votes come in live and see results update instantly</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-sans text-3xl font-bold text-foreground">Featured Polls</h2>
            <Link href="/polls" className="text-sm font-semibold text-primary hover:text-primary/80">
              View all →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 1, title: "Best programming language for beginners?", votes: 1247, options: 4 },
              { id: 2, title: "Should remote work be the default?", votes: 892, options: 3 },
              { id: 3, title: "Most important skill for developers in 2025", votes: 2103, options: 5 },
            ].map((poll) => (
              <Link
                key={poll.id}
                href={`/polls/${poll.id}`}
                className="group rounded-md border-2 border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
              >
                <h3 className="mb-4 text-balance font-sans text-lg font-semibold text-card-foreground group-hover:text-primary">
                  {poll.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="font-medium">{poll.votes} votes</span>
                  <span>{poll.options} options</span>
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
              Ready to create your first poll?
            </h2>
            <p className="mb-8 text-balance text-lg text-foreground/80">
              Join our community and start gathering opinions today. Its free and takes less than a minute.
            </p>
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
