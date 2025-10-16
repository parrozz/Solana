import type { GameType, MatchState, KycTier, OfferStatus } from "@prisma/client"

export interface GameOffer {
  id: string
  creatorId: string
  gameType: GameType
  stakeLamports: bigint
  feeLamports: bigint
  timerCfgJson?: any
  status: OfferStatus
  createdAt: Date
  creator?: {
    walletPubkey: string
    kycTier: KycTier
  }
}

export interface Match {
  id: string
  offerId: string
  playerAId: string
  playerBId: string
  gameType: GameType
  stakeLamports: bigint
  feePerPlayerLamports: bigint
  state: MatchState
  result?: string | null
  resultMetaJson?: any
  startedAt?: Date | null
  endedAt?: Date | null
}

export interface User {
  id: string
  walletPubkey: string
  kycTier: KycTier
  country?: string | null
  language: string
  isOver18: boolean
}

export interface WalletBalance {
  lamports: bigint
  sol: number
}

export interface AffiliateStats {
  code: string
  totalReferrals: number
  activeReferrals: number
  totalRakeLamports: bigint
  totalCommissionLamports: bigint
  pendingCommissionLamports: bigint
}

// WebSocket event types
export type WSEvent =
  | { type: "offer:created"; data: GameOffer }
  | { type: "offer:matched"; data: { offerId: string } }
  | { type: "offer:cancelled"; data: { offerId: string } }
  | { type: "match:state"; data: { matchId: string; state: MatchState; gameState?: any } }
  | { type: "match:move"; data: { matchId: string; ply: number; move: any } }
  | { type: "match:timer"; data: { matchId: string; timeLeft: number } }
  | { type: "match:result"; data: { matchId: string; result: string; winner?: string } }
  | { type: "error"; data: { message: string } }
