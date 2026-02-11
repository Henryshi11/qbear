// bot/src/handlers/stats.ts

import { Context } from 'telegraf'
import { backend } from '../backendClient.js'

export async function handleStats(ctx: Context) {
  try {
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
    const nextNeed = data.nextNeed

    // 进度条（简单版）
    const exp = Number(bear.exp ?? 0)
    const need = Number(nextNeed ?? 1)
    const pct = Math.max(0, Math.min(1, exp / need))
    const barLen = 10
    const filled = Math.round(pct * barLen)
    const bar = '█'.repeat(filled) + '░'.repeat(barLen - filled)

    const text =
      `📊 QBear 状态\n\n` +
      `等级: ${bear.level}\n` +
      `经验: ${exp} / ${need}  [${bar}]\n` +
      `金币: ${bear.coins}（每10分钟+1）\n` +
      `体力: ${bear.stamina}/${bear.staminaMax}\n` +
      `饱食度: ${bear.hunger}/${bear.hungerMax}\n` +
      `心情: ${bear.mood}/${bear.moodMax}`

    await ctx.reply(text)
  } catch (e) {
    console.error('Stats error:', e)
    await ctx.reply('Stats 出错了（看控制台）')
  }
}
