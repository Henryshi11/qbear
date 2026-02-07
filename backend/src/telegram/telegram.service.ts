import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

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

    const user = await this.prisma.user.create({
      data: {
        tgId,
        bear: {
          create: {
            level: 1,
            exp: 0,
            stamina: 10,
            mood: 'CALM',
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
  const diffMs = now.getTime() - user.bear.lastActiveAt.getTime()
  const minutes = Math.floor(diffMs / 60000)

  let bear = user.bear
  if (minutes > 0) {
    bear = await this.prisma.bear.update({
      where: { id: user.bear.id },
      data: {
        exp: { increment: minutes },
        lastActiveAt: now,
      },
    })
  }

  return { ok: true, bear }
}

}
