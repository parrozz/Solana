import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: January 2025</p>

      <Card>
        <CardHeader>
          <CardTitle>1. Information We Collect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>We collect information you provide directly to us, including:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Wallet address</li>
            <li>KYC verification documents</li>
            <li>Game history and statistics</li>
            <li>Transaction records</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. How We Use Your Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Provide and maintain our services</li>
            <li>Process transactions and send notifications</li>
            <li>Comply with legal obligations (KYC/AML)</li>
            <li>Detect and prevent fraud</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Data Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Data Retention</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            We retain your information for as long as necessary to provide our services and comply with legal
            obligations. KYC documents are retained for 5 years after account closure as required by law.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Your Rights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
