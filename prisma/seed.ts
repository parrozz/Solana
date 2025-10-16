import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create demo users
  const user1 = await prisma.user.upsert({
    where: { walletPubkey: "DEMO_USER_1_PUBKEY" },
    update: {},
    create: {
      walletPubkey: "DEMO_USER_1_PUBKEY",
      kycTier: "L1",
      country: "FR",
      language: "fr",
      isOver18: true,
    },
  })

  const user2 = await prisma.user.upsert({
    where: { walletPubkey: "DEMO_USER_2_PUBKEY" },
    update: {},
    create: {
      walletPubkey: "DEMO_USER_2_PUBKEY",
      kycTier: "L1",
      country: "ES",
      language: "es",
      isOver18: true,
    },
  })

  console.log("Created demo users:", { user1, user2 })

  // Create demo affiliate
  const affiliate = await prisma.affiliate.create({
    data: {
      code: "DEMO2024",
      ownerId: user1.id,
    },
  })

  console.log("Created demo affiliate:", affiliate)

  console.log("Seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
