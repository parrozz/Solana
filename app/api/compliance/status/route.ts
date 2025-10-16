import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  try {
    // In a real app, get user ID from session/auth
    const userId = "demo-user-id"

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        kycTier: true,
        country: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Determine restrictions based on KYC tier and country
    const restrictions: string[] = []
    let canPlay = true

    if (user.kycTier === "NONE") {
      restrictions.push("Must complete KYC verification to play")
      canPlay = false
    }

    // Check for geo-restrictions (example)
    const restrictedCountries = ["US", "CN", "KP"]
    if (user.country && restrictedCountries.includes(user.country)) {
      restrictions.push(`Gaming not available in ${user.country}`)
      canPlay = false
    }

    const status = {
      kycTier: user.kycTier,
      isVerified: user.kycTier !== "NONE",
      canPlay,
      restrictions,
    }

    return NextResponse.json(status)
  } catch (error) {
    console.error("Error fetching compliance status:", error)
    return NextResponse.json({ error: "Failed to fetch compliance status" }, { status: 500 })
  }
}
