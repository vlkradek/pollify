import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Navbar } from "@/components/NavBar"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import { Footer } from "@/components/footer"
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Pollify",
  description: "Rychlé ankety pro každého",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} font-sans antialiased`}>
                <SessionProvider>
                    <Navbar />
                    <Toaster position="top-right" />
                    {children}
                    <Footer/>
                </SessionProvider>
                <Analytics />
            </body>
        </html>
    );
}
