import { NextResponse } from "next/server"

// Mock game state
const games = new Map()

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { choice } = await request.json()

    let game = games.get(params.id)

    if (!game) {
      // Initialize new game
      game = {
        id: params.id,
        player1: "you",
        player2: "opponent",
        player1Choice: choice,
        player2Choice: null,
        result: null,
        winner: null,
        stake: 0.1,
        flipping: true,
      }
      games.set(params.id, game)
    } else {
      game.player1Choice = choice
      game.flipping = true
    }

    // Simulate coin flip
    setTimeout(() => {
      const result = Math.random() > 0.5 ? "HEADS" : "TAILS"
      game.result = result
      game.flipping = false
      game.winner = game.player1Choice === result ? "player1" : "player2"
    }, 2000)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error flipping coin:", error)
    return NextResponse.json({ error: "Failed to flip coin" }, { status: 500 })
  }
}
