import 'dotenv/config'
import { Telegraf } from 'telegraf'
import { config } from './config.js'
import { handleStart } from './handlers/start.js'
import { handleStats } from './handlers/stats.js'


if (!config.botToken) {
  throw new Error('BOT_TOKEN is missing')
}

const bot = new Telegraf(config.botToken)

bot.start(handleStart)
bot.command('stats', handleStats)

bot.launch().then(() => {
  console.log('QBear bot is running...')
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
