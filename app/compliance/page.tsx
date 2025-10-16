"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Shield, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type KycTier = "NONE" | "L1" | "L2"

interface ComplianceStatus {
  kycTier: KycTier
  isVerified: boolean
  canPlay: boolean
  restrictions: string[]
}

const tierInfo = {
  NONE: {
    label: "Not Verified",
    color: "destructive" as const,
    icon: AlertCircle,
    limits: "Cannot play games",
    description: "Complete KYC verification to start playing",
  },
  L1: {
    label: "Level 1 Verified",
    color: "secondary" as const,
    icon: CheckCircle,
    limits: "Up to 1 SOL per game",
    description: "Basic verification complete",
  },
  L2: {
    label: "Level 2 Verified",
    color: "default" as const,
    icon: Shield,
    limits: "Unlimited stakes",
    description: "Full verification complete",
  },
}

export default function CompliancePage() {
  const [status, setStatus] = useState<ComplianceStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchComplianceStatus()
  }, [])

  const fetchComplianceStatus = async () => {
    try {
      const response = await fetch("/api/compliance/status")
      if (response.ok) {
        const data = await response.json()
        setStatus(data)
      }
    } catch (error) {
      console.error("Failed to fetch compliance status:", error)
    } finally {
      setLoading(false)
    }
  }

  const startKycVerification = async (tier: "L1" | "L2") => {
    setVerifying(true)
    try {
      const response = await fetch("/api/compliance/start-kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      })

      if (response.ok) {
        const data = await response.json()

        // In a real app, this would redirect to the KYC provider
        toast({
          title: "KYC Verification Started",
          description: `Redirecting to verification provider...`,
        })

        // Simulate redirect
        setTimeout(() => {
          window.location.href = data.verificationUrl
        }, 1500)
      } else {
        toast({
          title: "Error",
          description: "Failed to start KYC verification.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while starting verification.",
        variant: "destructive",
      })
    } finally {
      setVerifying(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading compliance status...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!status) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load compliance status. Please try again later.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const currentTierInfo = tierInfo[status.kycTier]
  const TierIcon = currentTierInfo.icon

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Compliance & Verification</h1>
        <p className="text-muted-foreground">Manage your KYC status and account verification</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Verification Status</CardTitle>
              <CardDescription>Your account verification level</CardDescription>
            </div>
            <TierIcon className="h-8 w-8 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">KYC Tier</span>
            <Badge variant={currentTierInfo.color}>{currentTierInfo.label}</Badge>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Stake Limit</span>
            <span className="text-sm text-muted-foreground">{currentTierInfo.limits}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Can Play Games</span>
            {status.canPlay ? (
              <Badge variant="default">
                <CheckCircle className="h-3 w-3 mr-1" />
                Yes
              </Badge>
            ) : (
              <Badge variant="destructive">
                <AlertCircle className="h-3 w-3 mr-1" />
                No
              </Badge>
            )}
          </div>

          {status.restrictions.length > 0 && (
            <>
              <Separator />
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-semibold mb-1">Account Restrictions:</div>
                  <ul className="list-disc list-inside text-sm">
                    {status.restrictions.map((restriction, index) => (
                      <li key={index}>{restriction}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            </>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Level 1 Verification
            </CardTitle>
            <CardDescription>Basic identity verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Requirements:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Valid government ID</li>
                <li>Age verification (18+)</li>
                <li>Basic personal information</li>
              </ul>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Benefits:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Play games up to 1 SOL</li>
                <li>Access to all game types</li>
                <li>Withdraw winnings</li>
              </ul>
            </div>
            {status.kycTier === "NONE" && (
              <Button onClick={() => startKycVerification("L1")} disabled={verifying} className="w-full">
                {verifying ? "Starting..." : "Start L1 Verification"}
              </Button>
            )}
            {status.kycTier === "L1" && (
              <Badge variant="default" className="w-full justify-center py-2">
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed
              </Badge>
            )}
            {status.kycTier === "L2" && (
              <Badge variant="secondary" className="w-full justify-center py-2">
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Level 2 Verification
            </CardTitle>
            <CardDescription>Enhanced verification for high stakes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Requirements:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Level 1 verification complete</li>
                <li>Proof of address</li>
                <li>Enhanced due diligence</li>
              </ul>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Benefits:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Unlimited stake amounts</li>
                <li>Priority support</li>
                <li>Faster withdrawals</li>
              </ul>
            </div>
            {status.kycTier === "NONE" && (
              <Button variant="outline" disabled className="w-full bg-transparent">
                <Clock className="h-4 w-4 mr-2" />
                Complete L1 First
              </Button>
            )}
            {status.kycTier === "L1" && (
              <Button onClick={() => startKycVerification("L2")} disabled={verifying} className="w-full">
                {verifying ? "Starting..." : "Start L2 Verification"}
              </Button>
            )}
            {status.kycTier === "L2" && (
              <Badge variant="default" className="w-full justify-center py-2">
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Why Verification?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>We require identity verification to comply with regulations and ensure a safe gaming environment:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Prevent underage gambling (18+ only)</li>
            <li>Combat fraud and money laundering</li>
            <li>Comply with local gaming regulations</li>
            <li>Protect all players in our community</li>
          </ul>
          <p className="pt-2">
            Your personal information is encrypted and stored securely. We never share your data with third parties
            without your consent.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
