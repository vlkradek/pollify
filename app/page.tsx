
interface Poll {
  id: number
  title: string
  description: string
  votes: number
}

export const dynamic = 'force-dynamic';

export default async function HomePage() {

  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/polls");
  const data = await res.json();
  console.log(data);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900">Pollify</h1>
          <p className="text-lg text-gray-600">Vote on polls or create your own</p>
        </header>

        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Active Polls</h2>
            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Create Poll
            </button>
          </div>


            <div className="grid gap-4 md:grid-cols-2">
              {data.polls.map((poll: Poll) => (
                <div
                  key={poll.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="mb-2 text-balance text-lg font-semibold text-gray-900">{poll.title}</h3>
                  <p className="mb-4 text-sm text-gray-600">{poll.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{poll.votes} votes</span>
                    <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      View Poll
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>

        <div className="mt-12 rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">Create an Account</h3>
          <p className="mb-4 text-gray-600">Sign up to create your own polls and start gathering opinions</p>
          <button className="rounded-md bg-blue-600 px-6 py-2 text-base font-medium text-white hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </div>
    </main>
  )
}
