import { Prisma } from "@prisma/client"

export type PollFullType = Prisma.PollGetPayload<{
    include:{
        options: {
            include: {
                votes: true
            }
        },
    }
}>