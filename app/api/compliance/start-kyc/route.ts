import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { tier } = await request.json()

    if (!["L1", "L2"].includes(tier)) {
      return NextResponse.json({ error: "Invalid KYC tier" }, { status: 400 })
    }

    // In a real app, get user ID from session/auth
    const userId = "demo-user-id"

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user can upgrade to this tier
    if (tier === "L2" && user.kycTier !== "L1") {
      return NextResponse.json({ error: "Must complete L1 verification first" }, { status: 400 })
    }

    // In a real app, this would integrate with a KYC provider like Onfido, Jumio, etc.
    // For now, we'll return a mock verification URL
    const verificationUrl = `https://kyc-provider.example.com/verify?user=${userId}&tier=${tier}&callback=${encodeURIComponent(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/compliance/kyc-webhook`,
    )}`

    return NextResponse.json({
      verificationUrl,
      tier,
    })
  } catch (error) {
    console.error("Error starting KYC verification:", error)
    return NextResponse.json({ error: "Failed to start KYC verification" }, { status: 500 })
  }
}
