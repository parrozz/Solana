import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  try {
    // In a real app, verify admin authentication here

    const users = await prisma.user.findMany({
      select: {
        id: true,
        walletAddress: true,
        kycTier: true,
        country: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const userData = users.map((user) => ({
      id: user.id,
      walletAddress: user.walletAddress,
      kycTier: user.kycTier,
      country: user.country,
      createdAt: user.createdAt.toISOString(),
      lastActive: user.updatedAt.toISOString(),
    }))

    return NextResponse.json(userData)
  } catch (error) {
    console.error("Error fetching compliance data:", error)
    return NextResponse.json({ error: "Failed to fetch compliance data" }, { status: 500 })
  }
}
