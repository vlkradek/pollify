import { Prisma } from "@prisma/client"
import z from "zod"

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
export const CreatePollSchema = z.object({
  title: z.string().min(1, "Název ankety je povinný a nesmí být prázdný.").max(255, "Název ankety nesmí být delší než 255 znaků."),
  description: z.string().max(1000, "Popis ankety nesmí být delší než 1000 znaků.").optional(),
  options: z.array(z.string().min(1, "Každá možnost musí mít alespoň 1 znak.").max(255, "Každá možnost nesmí mít více než 255 znaků."))
    .min(2, "Musíte přidat alespoň 2 možnosti.")
    .max(10, "Maximální počet možností je 10."),
  creatorId: z.string().regex(/^[a-z0-9]{25}$/),
});