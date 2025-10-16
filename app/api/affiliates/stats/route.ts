import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  try {
    // In a real app, get user ID from session/auth
    const userId = "demo-user-id"

    // Check if user has an affiliate code
    const affiliate = await prisma.affiliate.findUnique({
      where: { userId },
      include: {
        referrals: {
          include: {
            transactions: {
              where: {
                type: "AFFILIATE_COMMISSION",
              },
            },
          },
        },
      },
    })

    if (!affiliate) {
      return NextResponse.json(null, { status: 404 })
    }

    // Calculate stats
    const totalReferrals = affiliate.referrals.length
    const activeReferrals = affiliate.referrals.filter((ref) => ref.transactions.length > 0).length

    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    let last7DaysEarnings = 0
    let lifetimeEarnings = 0

    affiliate.referrals.forEach((referral) => {
      referral.transactions.forEach((tx) => {
        const amount = Number.parseFloat(tx.amount.toString())
        lifetimeEarnings += amount

        if (tx.createdAt >= sevenDaysAgo) {
          last7DaysEarnings += amount
        }
      })
    })

    const stats = {
      code: affiliate.code,
      totalReferrals,
      activeReferrals,
      totalEarnings: lifetimeEarnings,
      last7DaysEarnings,
      lifetimeEarnings,
      conversionRate: totalReferrals > 0 ? (activeReferrals / totalReferrals) * 100 : 0,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching affiliate stats:", error)
    return NextResponse.json({ error: "Failed to fetch affiliate stats" }, { status: 500 })
  }
}
