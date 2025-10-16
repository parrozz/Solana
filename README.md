# SolSkill - Solana 1v1 Gaming Platform MVP

A production-ready MVP for a skill-based 1v1 gaming platform with mandatory SOL stakes, built on Solana.

## Features

- **5 Games**: Tic-Tac-Toe (fully implemented), Connect 4, Checkers, Reaction, Coinflip (stubs)
- **SOL Betting**: Mandatory stakes with 10% platform rake
- **Real-time Gameplay**: WebSocket-based with server-authoritative validation
- **Wallet Integration**: Phantom wallet via SIWS (Sign-In With Solana)
- **Affiliate System**: 70% commission for 7 days, then 50% lifetime
- **Compliance**: 18+ verification, KYC tiers, geo-blocking
- **Multi-language**: French, English, Spanish (i18n ready)
- **PWA Ready**: Mobile-first progressive web app

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Socket.IO
- **Database**: PostgreSQL + Prisma ORM
- **Cache/Queue**: Redis (Upstash compatible)
- **Blockchain**: Solana (web3.js, wallet-adapter)
- **Auth**: SIWS (Sign-In With Solana)

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Docker and Docker Compose (for local DB)
- Phantom wallet browser extension

### Installation

1. Clone the repository and install dependencies:

\`\`\`bash
pnpm install
\`\`\`

2. Start local database services:

\`\`\`bash
docker-compose up -d
\`\`\`

3. Copy environment variables:

\`\`\`bash
cp .env.example .env
\`\`\`

4. Generate Prisma client and run migrations:

\`\`\`bash
pnpm prisma:generate
pnpm db:migrate
pnpm db:seed
\`\`\`

5. Start the development server:

\`\`\`bash
pnpm dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── lobby/             # Game lobby
│   ├── wallet/            # Wallet management
│   ├── affiliates/        # Affiliate dashboard
│   ├── history/           # Match history
│   ├── settings/          # User settings
│   └── legal/             # Terms & Privacy
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── games/                # Game engines
│   ├── tictactoe/        # Tic-Tac-Toe (full impl)
│   └── ...               # Other games (stubs)
├── lib/                  # Utilities
│   ├── config.ts         # App configuration
│   ├── db.ts             # Prisma client
│   ├── prices.ts         # Oracle interface
│   └── validators.ts     # Zod schemas
├── prisma/               # Database schema
└── server/               # Backend services
    ├── escrow/           # Mock escrow (MVP)
    └── services/         # Business logic
\`\`\`

## Key Business Logic

### Rake System
- 10% rake per player, deducted upfront when joining a match
- Escrow holds 2× stake on-chain (mock in MVP)
- Winner receives full 2× stake (fees already paid)

### Affiliate Commissions
- First-touch attribution on first deposit
- 70% of net rake for first 7 days
- 50% of net rake lifetime after
- Anti-fraud: prevents self-referral

### Match Flow
1. Player A creates offer (stake + fee locked)
2. Player B joins offer (stake + fee locked)
3. Real-time gameplay via WebSocket
4. Server validates all moves (anti-cheat)
5. Winner receives 2× stake
6. Forfeit/disconnect rules apply

## TODO for Production

- [ ] Replace MockEscrow with Solana on-chain program (Anchor)
- [ ] Integrate real Pyth oracle for SOL/EUR conversion
- [ ] Implement KYC provider integration
- [ ] Add Cloudflare Turnstile anti-bot
- [ ] Setup Sentry error tracking
- [ ] Implement remaining games (Connect4, Checkers, etc.)
- [ ] Add comprehensive test suite
- [ ] Setup CI/CD pipeline
- [ ] Configure CSP and security headers
- [ ] Add rate limiting and DDoS protection

## License

Proprietary - All rights reserved
\`\`\`
