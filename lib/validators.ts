import { z } from "zod"
import { GameType } from "@prisma/client"

export const createOfferSchema = z.object({
  gameType: z.nativeEnum(GameType),
  stakeLamports: z.string().transform((val) => BigInt(val)),
  timerCfg: z
    .object({
      moveTimeoutSec: z.number().min(5).max(60).optional(),
    })
    .optional(),
})

export const joinOfferSchema = z.object({
  offerId: z.string().cuid(),
})

export const makeMoveSchema = z.object({
  matchId: z.string().cuid(),
  move: z.any(), // Game-specific validation
})

export const createAffiliateSchema = z.object({
  code: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_-]+$/),
})

export const depositIntentSchema = z.object({
  amountLamports: z.string().transform((val) => BigInt(val)),
})

export const withdrawIntentSchema = z.object({
  amountLamports: z.string().transform((val) => BigInt(val)),
  destinationPubkey: z.string(),
})
