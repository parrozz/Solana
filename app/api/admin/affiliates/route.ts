import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  try {
    // In a real app, verify admin authentication here

    const affiliates = await prisma.affiliate.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    })

    const affiliateData = affiliates.map((affiliate) => {
      const totalReferrals = affiliate.referrals.length
      const totalEarnings = affiliate.referrals.reduce((sum, ref) => {
        return (
          sum +
          ref.transactions.reduce((txSum, tx) => {
            return txSum + Number.parseFloat(tx.amount.toString())
          }, 0)
        )
      }, 0)

      return {
        id: affiliate.id,
        code: affiliate.code,
        userId: affiliate.userId,
        totalReferrals,
        totalEarnings,
        createdAt: affiliate.createdAt.toISOString(),
      }
    })

    return NextResponse.json(affiliateData)
  } catch (error) {
    console.error("Error fetching affiliates:", error)
    return NextResponse.json({ error: "Failed to fetch affiliates" }, { status: 500 })
  }
}
