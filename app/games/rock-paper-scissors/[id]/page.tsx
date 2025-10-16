"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, Trophy, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Choice = "ROCK" | "PAPER" | "SCISSORS" | null

interface GameState {
  id: string
  player1: string
  player2: string
  currentRound: number
  totalRounds: number
  player1Score: number
  player2Score: number
  player1Choice: Choice
  player2Choice: Choice
  winner: string | null
  stake: number
}

const choices = [
  { value: "ROCK", label: "Rock", emoji: "✊" },
  { value: "PAPER", label: "Paper", emoji: "✋" },
  { value: "SCISSORS", label: "Scissors", emoji: "✌️" },
]

export default function RockPaperScissorsGame() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [game, setGame] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(true)
  const [myChoice, setMyChoice] = useState<Choice>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchGameState()
    const interval = setInterval(fetchGameState, 2000)
    return () => clearInterval(interval)
  }, [params.id])

  const fetchGameState = async () => {
    try {
      const response = await fetch(`/api/games/rock-paper-scissors/${params.id}`)
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

  const makeChoice = async (choice: Choice) => {
    if (!choice || submitting) return

    setMyChoice(choice)
    setSubmitting(true)

    try {
      const response = await fetch(`/api/games/rock-paper-scissors/${params.id}/move`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice }),
      })

      if (response.ok) {
        toast({
          title: "Choice Submitted",
          description: `You chose ${choice}. Waiting for opponent...`,
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
  const waitingForOpponent = myChoice && !game.player2Choice && !game.winner
  const roundComplete = game.player1Choice && game.player2Choice

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rock Paper Scissors</h1>
          <p className="text-muted-foreground">Best of {game.totalRounds}</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {game.stake} SOL
        </Badge>
      </div>

      {/* Score Board */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Round {game.currentRound}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">You</p>
              <p className="text-3xl font-bold">{game.player1Score}</p>
            </div>
            <div className="text-center">
              <Separator className="mb-2" />
              <p className="text-sm text-muted-foreground">VS</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Opponent</p>
              <p className="text-3xl font-bold">{game.player2Score}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Winner */}
      {game.winner && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6" />
              {game.winner === "player1" ? "You Win!" : "Opponent Wins!"}
            </CardTitle>
            <CardDescription className="text-center">
              {game.winner === "player1" ? `You won ${(game.stake * 1.9).toFixed(4)} SOL!` : `Better luck next time!`}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => router.push("/lobby")}>Back to Lobby</Button>
          </CardContent>
        </Card>
      )}

      {/* Round Result */}
      {roundComplete && !game.winner && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Round Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 items-center text-center">
              <div>
                <p className="text-4xl mb-2">{choices.find((c) => c.value === game.player1Choice)?.emoji}</p>
                <p className="text-sm text-muted-foreground">{game.player1Choice}</p>
              </div>
              <div>
                <X className="h-8 w-8 mx-auto text-muted-foreground" />
              </div>
              <div>
                <p className="text-4xl mb-2">{choices.find((c) => c.value === game.player2Choice)?.emoji}</p>
                <p className="text-sm text-muted-foreground">{game.player2Choice}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Choice Selection */}
      {!game.winner && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isMyTurn && "Make Your Choice"}
              {waitingForOpponent && "Waiting for Opponent..."}
              {roundComplete && "Next Round Starting..."}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isMyTurn && (
              <div className="grid grid-cols-3 gap-4">
                {choices.map((choice) => (
                  <Button
                    key={choice.value}
                    size="lg"
                    variant="outline"
                    className="h-32 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 bg-transparent"
                    onClick={() => makeChoice(choice.value as Choice)}
                    disabled={submitting}
                  >
                    <span className="text-5xl">{choice.emoji}</span>
                    <span className="text-lg font-semibold">{choice.label}</span>
                  </Button>
                ))}
              </div>
            )}
            {waitingForOpponent && (
              <div className="text-center py-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Opponent is making their choice...</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
