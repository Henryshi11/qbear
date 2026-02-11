// backend/src/telegram/gameRules.ts

export function needExp(level: number) {
  // 方案 B：升级经验递增
  // 1->2: 10, 2->3: 20, ...
  return 10 * level
}

export function applyIdleCoins(params: {
  coins: number
  lastCoinAt: Date
  now?: Date
}) {
  const now = params.now ?? new Date()

  const diffMs = now.getTime() - params.lastCoinAt.getTime()
  const minutesPassed = Math.floor(diffMs / 60000)

  const coinsAdd = Math.floor(minutesPassed / 10)
  const remainder = minutesPassed % 10

  if (coinsAdd <= 0) {
    return {
      coinsAdd: 0,
      minutesPassed,
      newCoins: params.coins,
      newLastCoinAt: params.lastCoinAt,
    }
  }

  // lastCoinAt = now - remainder minutes（保留余数）
  const newLastCoinAt = new Date(now.getTime() - remainder * 60000)

  return {
    coinsAdd,
    minutesPassed,
    newCoins: params.coins + coinsAdd,
    newLastCoinAt,
  }
}
