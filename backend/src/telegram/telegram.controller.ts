import { Body, Controller, Post } from '@nestjs/common'
import { TelegramService } from './telegram.service'
import { TelegramStartDto } from './dto/telegram-start.dto'
import { UseGuards } from '@nestjs/common'
import { BotTokenGuard } from './guards/bot-token.guard'

@UseGuards(BotTokenGuard)
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('start')
  async start(@Body() body: TelegramStartDto) {
    return this.telegramService.start(body.tgId)
  }
}
