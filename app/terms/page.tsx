import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <h1 className="text-4xl font-bold">Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: January 2025</p>

      <Card>
        <CardHeader>
          <CardTitle>1. Acceptance of Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            By accessing and using Solana 1v1 Games, you accept and agree to be bound by the terms and provision of this
            agreement.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Age Requirement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            You must be at least 18 years old to use this platform. By using our services, you represent and warrant
            that you are of legal age.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Account Responsibilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            You are responsible for maintaining the security of your wallet and account. We are not liable for any loss
            or damage from your failure to comply with this security obligation.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Gaming Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            All games must be played fairly. Any attempt to cheat, exploit, or manipulate games will result in immediate
            account termination and forfeiture of funds.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Fees and Payouts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            We charge a 10% platform fee on all games. Winners receive 90% of the total stake. Payouts are processed
            immediately upon game completion.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
