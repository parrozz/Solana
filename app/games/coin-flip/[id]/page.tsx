"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Trophy, Coins } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Side = "HEADS" | "TAILS" | null

interface GameState {
  id: string
  player1: string
  player2: string
  player1Choice: Side
  player2Choice: Side
  result: Side
  winner: string | null
  stake: number
  flipping: boolean
}

export default function CoinFlipGame() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [game, setGame] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(true)
  const [myChoice, setMyChoice] = useState<Side>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchGameState()
    const interval = setInterval(fetchGameState, 1000)
    return () => clearInterval(interval)
  }, [params.id])

  const fetchGameState = async () => {
    try {
      const response = await fetch(`/api/games/coin-flip/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setGame(data)
      }
    } catch (error) {
      console.error("Failed to fetch game state:", error)
    } finally {
      setLoading(false)
    }
  }

  const makeChoice = async (choice: Side) => {
    if (!choice || submitting) return

    setMyChoice(choice)
    setSubmitting(true)

    try {
      const response = await fetch(`/api/games/coin-flip/${params.id}/flip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice }),
      })

      if (response.ok) {
        toast({
          title: "Choice Submitted",
          description: `You chose ${choice}. Flipping coin...`,
        })
        await fetchGameState()
      } else {
        toast({
          title: "Error",
          description: "Failed to submit choice.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Game Not Found</CardTitle>
            <CardDescription>This game does not exist or has been deleted.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/lobby")}>Back to Lobby</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isMyTurn = !myChoice && !game.winner
  const waitingForFlip = myChoice && game.flipping

  return (
    <div className="container mx-auto p-6 max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Coin Flip</h1>
          <p className="text-muted-foreground">Call it in the air!</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {game.stake} SOL
        </Badge>
      </div>

      {/* Coin Animation */}
      <Card>
        <CardContent className="py-12">
          <div className="flex justify-center">
            {game.flipping ? (
              <div className="animate-spin">
                <Coins className="h-32 w-32 text-primary" />
              </div>
            ) : game.result ? (
              <div className="text-center">
                <div className="text-8xl mb-4">{game.result === "HEADS" ? "👑" : "🦅"}</div>
                <p className="text-2xl font-bold">{game.result}</p>
              </div>
            ) : (
              <Coins className="h-32 w-32 text-muted-foreground" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Game Result */}
      {game.winner && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6" />
              {game.winner === "player1" ? "You Win!" : "You Lose!"}
            </CardTitle>
            <CardDescription className="text-center">
              {game.winner === "player1"
                ? `The coin landed on ${game.result}! You won ${(game.stake * 1.9).toFixed(4)} SOL!`
                : `The coin landed on ${game.result}. Better luck next time!`}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => router.push("/lobby")}>Back to Lobby</Button>
          </CardContent>
        </Card>
      )}

      {/* Choice Selection */}
      {!game.winner && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {isMyTurn && "Choose Your Side"}
              {waitingForFlip && "Flipping Coin..."}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isMyTurn && (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-40 flex flex-col gap-4 hover:border-primary hover:bg-primary/5 bg-transparent"
                  onClick={() => makeChoice("HEADS")}
                  disabled={submitting}
                >
                  <span className="text-6xl">👑</span>
                  <span className="text-xl font-semibold">HEADS</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-40 flex flex-col gap-4 hover:border-primary hover:bg-primary/5 bg-transparent"
                  onClick={() => makeChoice("TAILS")}
                  disabled={submitting}
                >
                  <span className="text-6xl">🦅</span>
                  <span className="text-xl font-semibold">TAILS</span>
                </Button>
              </div>
            )}
            {waitingForFlip && (
              <div className="text-center py-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">The coin is in the air...</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
