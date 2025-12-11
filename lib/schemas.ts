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

export type UserFullType = Prisma.UserGetPayload<{
    include: {
        polls: {
            include: {
                votes: true
            }
        }
    }
}>