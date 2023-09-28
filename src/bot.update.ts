import { BotService } from '@bot.service';
import { ActionContract } from '@shared/decorators/telegraf/action.decorator';
import { Logger } from '@nestjs/common';
import { Auth, CommandContract } from '@shared/decorators';
import { IContext } from '@shared/types';
import { Start, Update } from 'nestjs-telegraf';

@Update()
export class BotUpdate {
  constructor(private botService: BotService) {}

  @Start()
  @CommandContract('commands.start')
  async sayHello(ctx: IContext) {
    const { botService } = this;

    await ctx.scene.leave();
    await botService.setMyCommads(ctx);

    Logger.verbose(ctx.session, `SESSION - START`);

    return `Hello bro, ${ctx.from.username}!!!`;
  }

  @Auth()
  @CommandContract('commands.reg')
  async goRegistration(ctx: IContext) {
    await ctx.typedSendMessage('phrases.start', {
      args: {
        name: ctx.from.first_name,
      },
      ...ctx.k.typedInlineKeyboard(
        [
          [{ text: 'buttons.reg', args: {} }, { text: 'buttons.reg' }],
          ['buttons.reg', 'buttons.reg'],
          ['buttons.reg', 'buttons.reg'],
          ['buttons.reg', 'buttons.reg'],
        ],
        ctx,
      ),
    });
  }

  @ActionContract(/f12/)
  async toScene() {
    console.log(`идем в сцену`);
  }
}
