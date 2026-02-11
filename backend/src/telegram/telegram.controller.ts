// backend/src/telegram/telegram.controller.ts

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { TelegramService } from './telegram.service'
import { TelegramStartDto } from './dto/telegram-start.dto'
import { BotTokenGuard } from './guards/bot-token.guard'

@UseGuards(BotTokenGuard)
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('start')
  async start(@Body() body: TelegramStartDto) {
    return this.telegramService.start(body.tgId)
  }

  @Get('stats/:tgId')
  async stats(@Param('tgId') tgId: string) {
    return this.telegramService.stats(tgId)
  }
}
