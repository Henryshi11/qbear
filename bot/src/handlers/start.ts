import { Context } from 'telegraf'
import { backend } from '../backendClient'

export async function handleStart(ctx: Context) {
  const from = ctx.from
  if (!from) return

  const tgId = String(from.id)

  const res = await backend.post('/telegram/start', { tgId })
  const { isNew, bear } = res.data

  const title = isNew ? '🐻 欢迎来到 QBear！' : '🐻 欢迎回来！'
  const text =
    `${title}\n\n` +
    `等级: ${bear.level}\n` +
    `经验: ${bear.exp}\n` +
    `体力: ${bear.stamina}\n` +
    `心情: ${bear.mood}\n\n` +
    `输入 /stats（下一步我们做）查看完整信息。`

  await ctx.reply(text)
}
