"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, Users, DollarSign, TrendingUp, LinkIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AffiliateStats {
  code: string
  totalReferrals: number
  activeReferrals: number
  totalEarnings: number
  last7DaysEarnings: number
  lifetimeEarnings: number
  conversionRate: number
}

export default function AffiliatePage() {
  const [stats, setStats] = useState<AffiliateStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchAffiliateStats()
  }, [])

  const fetchAffiliateStats = async () => {
    try {
      const response = await fetch("/api/affiliates/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Failed to fetch affiliate stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateAffiliateCode = async () => {
    setGenerating(true)
    try {
      const response = await fetch("/api/affiliates/generate", {
        method: "POST",
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
        toast({
          title: "Affiliate Code Generated",
          description: "Your unique affiliate code has been created.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to generate affiliate code.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while generating your code.",
        variant: "destructive",
      })
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Link copied to clipboard.",
    })
  }

  const affiliateUrl = stats ? `${window.location.origin}?ref=${stats.code}` : ""

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading affiliate data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="container mx-auto p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Become an Affiliate</CardTitle>
            <CardDescription>Earn 70% commission for 7 days, then 50% lifetime on all referrals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">How it works:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Generate your unique affiliate code</li>
                <li>Share your referral link with friends</li>
                <li>Earn 70% of platform fees for the first 7 days</li>
                <li>Continue earning 50% lifetime commission after that</li>
              </ul>
            </div>
            <Button onClick={generateAffiliateCode} disabled={generating} className="w-full">
              {generating ? "Generating..." : "Generate Affiliate Code"}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Affiliate Dashboard</h1>
        <p className="text-muted-foreground">Track your referrals and earnings</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">{stats.activeReferrals} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEarnings.toFixed(4)} SOL</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 7 Days</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.last7DaysEarnings.toFixed(4)} SOL</div>
            <p className="text-xs text-muted-foreground">70% commission rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Clicks to signups</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="links" className="space-y-4">
        <TabsList>
          <TabsTrigger value="links">Referral Links</TabsTrigger>
          <TabsTrigger value="earnings">Earnings History</TabsTrigger>
        </TabsList>

        <TabsContent value="links" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Affiliate Code</CardTitle>
              <CardDescription>Share this code or link to earn commissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Affiliate Code</Label>
                <div className="flex gap-2">
                  <Input value={stats.code} readOnly />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(stats.code)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Referral Link</Label>
                <div className="flex gap-2">
                  <Input value={affiliateUrl} readOnly />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(affiliateUrl)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Commission Structure
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">First 7 days:</span>
                    <Badge variant="secondary">70% commission</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">After 7 days:</span>
                    <Badge variant="secondary">50% lifetime</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Breakdown</CardTitle>
              <CardDescription>Detailed view of your affiliate earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Lifetime Earnings</span>
                  <span className="font-semibold">{stats.lifetimeEarnings.toFixed(4)} SOL</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last 7 Days (70%)</span>
                  <span className="font-semibold">{stats.last7DaysEarnings.toFixed(4)} SOL</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Older (50%)</span>
                  <span className="font-semibold">
                    {(stats.lifetimeEarnings - stats.last7DaysEarnings).toFixed(4)} SOL
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
