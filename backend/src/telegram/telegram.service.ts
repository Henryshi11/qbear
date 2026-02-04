import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TelegramService {
  constructor(private prisma: PrismaService) {}

  async start(tgId: string) {
    const user = await this.prisma.user.upsert({
      where: { tgId },
      update: {},
      create: {
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
      message: `🐻 Welcome! Your bear is born!`,
      bear: user.bear,
    }
  }
}
