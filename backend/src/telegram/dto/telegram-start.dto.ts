import { IsString, Length } from 'class-validator'

export class TelegramStartDto {
  @IsString()
  @Length(1, 64)
  tgId!: string
}
