import { auth } from "@/auth"
import AccountSettings from "@/components/account-settings"
import { prisma } from "@/lib/prisma"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Můj účet | Pollify",

}


export default async function AccountPage() {
  const session = await auth()
  const userId = session?.user?.id
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      polls: {
        include: {
          votes: true,
        },
      },
    },
  })

  if (!user) {
    return notFound() //TODO: redirect to login page instead
  }
  
  return <AccountSettings user={user} />
}
