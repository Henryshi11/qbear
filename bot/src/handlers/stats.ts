import { Context } from 'telegraf'
import { backend } from '../backendClient.js'

export async function handleStats(ctx: Context) {
  try {
    console.log('Stats command received')

    const from = ctx.from
    if (!from) return

    const tgId = String(from.id)

    const res = await backend.get(`/telegram/stats/${tgId}`)
    const data = res.data

    if (!data.ok) {
      await ctx.reply(data.message ?? '获取失败')
      return
    }

    const bear = data.bear

    await ctx.reply(
      `📊 QBear 状态\n\n` +
      `等级: ${bear.level}\n` +
      `经验: ${bear.exp}\n` +
      `体力: ${bear.stamina}\n` +
      `心情: ${bear.mood}`
    )

  } catch (e) {
    console.error('Stats error:', e)
    await ctx.reply('Stats 出错了（看控制台）')
  }
}
