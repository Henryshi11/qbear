import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class BotTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & { headers: any }>()
    const token = req.headers['x-bot-token']
    const expected = process.env.BOT_SHARED_SECRET
    if (!expected) return true // 你也可以选择：没有配置就直接拒绝
    if (token !== expected) throw new UnauthorizedException('Invalid bot token')
    return true
  }
}
