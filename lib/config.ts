export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "SolSkill",
    minBetEUR: Number.parseFloat(process.env.NEXT_PUBLIC_MIN_BET_EUR || "0.10"),
    rakePct: Number.parseFloat(process.env.NEXT_PUBLIC_RAKE_PCT || "0.10"),
    supportedLangs: (process.env.NEXT_PUBLIC_SUPPORTED_LANGS || "fr,en,es").split(","),
  },

  affiliate: {
    initialCommissionPct: 0.7, // 70% for first 7 days
    ongoingCommissionPct: 0.5, // 50% lifetime after
    initialPeriodDays: 7,
  },

  compliance: {
    blockedCountries: [
      "US",
      "KP",
      "IR",
      "SY",
      "CU", // US sanctions
      "AF",
      "BY",
      "MM",
      "ZW",
      "VE", // Additional restrictions
    ],
    minAge: 18,
  },

  games: {
    tictactoe: {
      moveTimeoutSec: 10,
      maxGameTimeSec: 300,
    },
    connect4: {
      moveTimeoutSec: 15,
      maxGameTimeSec: 600,
    },
    checkers: {
      moveTimeoutSec: 20,
      maxGameTimeSec: 900,
    },
    reaction: {
      maxWaitTimeSec: 10,
      roundCount: 3,
    },
    coinflip: {
      maxWaitTimeSec: 30,
    },
  },

  solana: {
    network: process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet",
    rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "replace_me_in_production",
    expiresIn: "7d",
  },
} as const
