import AccountSettings from "@/components/account-settings"
// import { prisma } from "@/lib/prisma"

export default function AccountPage() {
  // Uncomment below to fetch real user data from database using Prisma
  /*
  const userId = 1 // Get from session/auth
  
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
  
  const userData = {
    name: user.name,
    email: user.email,
    polls: user.polls.map(poll => ({
      id: poll.id,
      title: poll.title,
      votes: poll.votes.length,
    })),
  }
  
  return <AccountSettings user={userData} />
  */

  // Mock data for now
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    polls: [
      { id: 1, title: "My first poll about programming", votes: 45 },
      { id: 2, title: "Favorite framework survey", votes: 78 },
    ],
  }

  return <AccountSettings user={userData} />
}
