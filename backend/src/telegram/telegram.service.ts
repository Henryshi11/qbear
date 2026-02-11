// backend/src/telegram/telegram.service.ts

import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { applyIdleCoins, needExp } from './gameRules'

@Injectable()
export class TelegramService {
  constructor(private prisma: PrismaService) {}

  async start(tgId: string) {
    const existing = await this.prisma.user.findUnique({
      where: { tgId },
      include: { bear: true },
    })

    if (existing?.bear) {
      return {
        isNew: false,
        message: `🐻 Welcome back!`,
        user: { tgId: existing.tgId, id: existing.id },
        bear: existing.bear,
      }
    }

    const now = new Date()

    const user = await this.prisma.user.create({
      data: {
        tgId,
        bear: {
          create: {
            level: 1,
            exp: 0,

            coins: 0,

            hunger: 50,
            hungerMax: 100,

            mood: 50,
            moodMax: 100,

            stamina: 10,
            staminaMax: 10,

            lastActiveAt: now,
            lastCoinAt: now,
          },
        },
      },
      include: { bear: true },
    })

    return {
      isNew: true,
      message: `🐻 Welcome! Your bear is born!`,
      user: { tgId: user.tgId, id: user.id },
      bear: user.bear,
    }
  }

  async stats(tgId: string) {
    const user = await this.prisma.user.findUnique({
      where: { tgId },
      include: { bear: true },
    })

    if (!user || !user.bear) {
      return { ok: false, message: '❗你还没有熊，先输入 /start' }
    }

    const now = new Date()
    const bear = user.bear

    // 1) 先结算挂机金币（10分钟=1金币）
    const coinRes = applyIdleCoins({
      coins: bear.coins,
      lastCoinAt: bear.lastCoinAt,
      now,
    })

    // 2) 再结算挂机经验（你原本逻辑：按分钟加 exp）
    const diffMs = now.getTime() - bear.lastActiveAt.getTime()
    const minutes = Math.floor(diffMs / 60000)

    // 如果你未来想把“挂机经验”去掉，只要把 minutes 部分注释即可
    const expAdd = minutes > 0 ? minutes : 0

    // 3) 统一落库（只在有变化时 update）
    const shouldUpdate =
      coinRes.coinsAdd > 0 || expAdd > 0

    let updatedBear = bear

    if (shouldUpdate) {
      updatedBear = await this.prisma.bear.update({
        where: { id: bear.id },
        data: {
          coins: coinRes.newCoins,
          lastCoinAt: coinRes.newLastCoinAt,

          ...(expAdd > 0
            ? {
                exp: { increment: expAdd },
                lastActiveAt: now,
              }
            : {}),
        },
      })
    }

    return {
      ok: true,
      bear: updatedBear,
      nextNeed: needExp(updatedBear.level),
      idle: {
        coinsAdd: coinRes.coinsAdd,
        minutesPassedForCoins: coinRes.minutesPassed,
        expAdd,
        minutesPassedForExp: minutes,
      },
    }
  }
}
