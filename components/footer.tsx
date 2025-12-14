import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[rgb(180,58,0)] text-neutral-300 border-t border-neutral-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo a popis */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white">
              Pollify
            </Link>
            <p className="mt-4 text-sm text-white max-w-md">
              Demokratická hlasovací platforma, kde může každý vytvářet a hlasovat v anketách. Sdílejte své názory a
              zjistěte, co si myslí ostatní.
            </p>
          </div>

          {/* Rychlé odkazy */}
          <div>
            <h3 className="text-white font-semibold mb-4">Rychlé odkazy</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/polls" className="text-sm text-white hover:underline transition-colors">
                  Všechna hlasování
                </Link>
              </li>
              <li>
                <Link href="/create-poll" className="text-sm text-white hover:underline transition-colors">
                  Vytvořit hlasování
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-sm text-white hover:underline transition-colors">
                  Můj účet
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/60">
          <p className="text-sm text-white text-center">
            {new Date().getFullYear()} Pollify
          </p>
        </div>
      </div>
    </footer>
  )
}
