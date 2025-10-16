import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

function generateAffiliateCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let code = ""
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: Request) {
  try {
    // In a real app, get user ID from session/auth
    const userId = "demo-user-id"

    // Check if user already has an affiliate code
    const existing = await prisma.affiliate.findUnique({
      where: { userId },
    })

    if (existing) {
      return NextResponse.json({
        code: existing.code,
        totalReferrals: 0,
        activeReferrals: 0,
        totalEarnings: 0,
        last7DaysEarnings: 0,
        lifetimeEarnings: 0,
        conversionRate: 0,
      })
    }

    // Generate unique code
    let code = generateAffiliateCode()
    let attempts = 0
    while (attempts < 10) {
      const exists = await prisma.affiliate.findUnique({
        where: { code },
      })
      if (!exists) break
      code = generateAffiliateCode()
      attempts++
    }

    // Create affiliate record
    const affiliate = await prisma.affiliate.create({
      data: {
        userId,
        code,
      },
    })

    return NextResponse.json({
      code: affiliate.code,
      totalReferrals: 0,
      activeReferrals: 0,
      totalEarnings: 0,
      last7DaysEarnings: 0,
      lifetimeEarnings: 0,
      conversionRate: 0,
    })
  } catch (error) {
    console.error("Error generating affiliate code:", error)
    return NextResponse.json({ error: "Failed to generate affiliate code" }, { status: 500 })
  }
}
