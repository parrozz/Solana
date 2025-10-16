import { NextResponse } from "next/server"

// Mock game state
const games = new Map()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const game = games.get(params.id)

  if (!game) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 })
  }

  return NextResponse.json(game)
}
