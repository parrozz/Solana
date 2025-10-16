import { NextResponse } from "next/server"

// Mock game state
const games = new Map()

function determineWinner(choice1: string, choice2: string): string | null {
  if (choice1 === choice2) return "draw"
  if (
    (choice1 === "ROCK" && choice2 === "SCISSORS") ||
    (choice1 === "PAPER" && choice2 === "ROCK") ||
    (choice1 === "SCISSORS" && choice2 === "PAPER")
  ) {
    return "player1"
  }
  return "player2"
}

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
        currentRound: 1,
        totalRounds: 3,
        player1Score: 0,
        player2Score: 0,
        player1Choice: choice,
        player2Choice: null,
        winner: null,
        stake: 0.1,
      }
      games.set(params.id, game)
    } else {
      game.player1Choice = choice
    }

    // Simulate opponent choice after a delay
    setTimeout(() => {
      const opponentChoices = ["ROCK", "PAPER", "SCISSORS"]
      game.player2Choice = opponentChoices[Math.floor(Math.random() * opponentChoices.length)]

      const roundWinner = determineWinner(game.player1Choice, game.player2Choice)

      if (roundWinner === "player1") {
        game.player1Score++
      } else if (roundWinner === "player2") {
        game.player2Score++
      }

      // Check if game is over
      if (game.player1Score > game.totalRounds / 2) {
        game.winner = "player1"
      } else if (game.player2Score > game.totalRounds / 2) {
        game.winner = "player2"
      } else if (game.currentRound >= game.totalRounds) {
        game.winner = game.player1Score > game.player2Score ? "player1" : "player2"
      } else {
        // Next round
        setTimeout(() => {
          game.currentRound++
          game.player1Choice = null
          game.player2Choice = null
        }, 2000)
      }
    }, 1500)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error making move:", error)
    return NextResponse.json({ error: "Failed to make move" }, { status: 500 })
  }
}
