import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In a real app, verify the webhook signature from the KYC provider
    const { userId, tier, status, verificationId } = body

    if (status !== "approved") {
      return NextResponse.json({ received: true })
    }

    // Update user's KYC tier
    await prisma.user.update({
      where: { id: userId },
      data: {
        kycTier: tier,
      },
    })

    // Log the verification
    console.log(`[v0] KYC verification completed for user ${userId}: ${tier}`)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing KYC webhook:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}
