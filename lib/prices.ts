// Mock oracle for SOL/EUR price conversion
// TODO: Replace with real Pyth oracle integration

const MOCK_SOL_EUR_RATE = 150.0 // 1 SOL = 150 EUR

export async function getSolEurRate(): Promise<number> {
  // In production, fetch from Pyth oracle
  return MOCK_SOL_EUR_RATE
}

export async function eurToLamports(eurAmount: number): Promise<bigint> {
  const rate = await getSolEurRate()
  const sol = eurAmount / rate
  const lamports = Math.floor(sol * 1e9)
  return BigInt(lamports)
}

export function lamportsToSol(lamports: bigint): number {
  return Number(lamports) / 1e9
}

export async function lamportsToEur(lamports: bigint): Promise<number> {
  const rate = await getSolEurRate()
  const sol = lamportsToSol(lamports)
  return sol * rate
}
