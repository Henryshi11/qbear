import { Body, Controller, Post } from '@nestjs/common'
import { TelegramService } from './telegram.service'

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('start')
  async start(@Body() body: { tgId: string }) {
    return this.telegramService.start(body.tgId)
  }
}
