import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Shield, Users, Zap, TrendingUp, Lock } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          Powered by Solana
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          Play. Compete. Win <span className="text-primary">SOL</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          The ultimate 1v1 gaming platform where skill meets stakes. Challenge players worldwide in real-time games with
          instant SOL payouts.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" asChild>
            <Link href="/lobby">
              <Gamepad2 className="mr-2 h-5 w-5" />
              Start Playing
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/affiliates">Become an Affiliate</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Instant Payouts</CardTitle>
              <CardDescription>Win and receive your SOL immediately. No waiting, no hassle.</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Secure & Fair</CardTitle>
              <CardDescription>
                Provably fair games with blockchain verification. Your funds are always safe.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Real-time Matches</CardTitle>
              <CardDescription>Play against real opponents in live 1v1 matches. No bots, just skill.</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Lock className="h-10 w-10 text-primary mb-2" />
              <CardTitle>KYC Protected</CardTitle>
              <CardDescription>18+ verified platform with tiered KYC for responsible gaming.</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Affiliate Program</CardTitle>
              <CardDescription>Earn 70% commission for 7 days, then 50% lifetime on referrals.</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Gamepad2 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Multiple Games</CardTitle>
              <CardDescription>Tic-Tac-Toe, Rock-Paper-Scissors, Coin Flip, and more coming soon.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Games Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Available Games</h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>Tic-Tac-Toe</CardTitle>
              <CardDescription>Classic strategy game. First to three in a row wins.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Players:</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">2-5 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Skill:</span>
                  <Badge variant="secondary">Strategy</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>Rock-Paper-Scissors</CardTitle>
              <CardDescription>Best of 3 rounds. Quick and exciting.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Players:</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">1-2 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Skill:</span>
                  <Badge variant="secondary">Luck + Mind Games</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>Coin Flip</CardTitle>
              <CardDescription>Simple and fast. Call heads or tails.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Players:</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">30 sec</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Skill:</span>
                  <Badge variant="secondary">Pure Luck</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Card className="max-w-3xl mx-auto bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl">Ready to Play?</CardTitle>
            <CardDescription className="text-lg">
              Connect your Phantom wallet and start competing in seconds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="/lobby">
                <Gamepad2 className="mr-2 h-5 w-5" />
                Enter Lobby
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Solana 1v1 Games. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/compliance" className="text-muted-foreground hover:text-foreground transition-colors">
                Compliance
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
