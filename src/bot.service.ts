import { IContext } from '@shared/types';
import { Injectable } from '@nestjs/common';
import { BotCommand } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class BotService {
  private readonly commands: BotCommand[] = [
    {
      command: 'start',
      description: 'запустить бота',
    },
    {
      command: 'reg',
      description: 'пройти регистрацию',
    },
  ];

  resetSession(ctx: IContext) {
    ctx.session.lang = 'ru';
    ctx.session.user = undefined;
  }

  async setMyCommads(ctx: IContext) {
    const { commands } = this;
    await ctx.telegram.setMyCommands(commands);
  }
}
