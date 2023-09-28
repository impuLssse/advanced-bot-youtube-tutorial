import { I18nPath, IContext, IExtraTextOptions, MiddlewareFunction } from '@libs/shared/types';
import { CoreExtra } from './core.class';
import { TranslateService } from '@translate';
import { NextFunction } from 'express';
import { Logger } from '@nestjs/common';

export class Extra extends CoreExtra {
  constructor(private translate: TranslateService) {
    super();
  }

  private functions: MiddlewareFunction[] = [
    this.injectTypedKeyboard(this.translate),
    this.reactiveCallbackButton(),
    this.typedSendMessage(),
  ];

  get middlewares(): MiddlewareFunction[] {
    return this.functions;
  }

  private typedSendMessage(): MiddlewareFunction {
    return async (ctx: IContext, next: NextFunction) => {
      const typedSendMessage = (text: I18nPath, extra?: IExtraTextOptions) => {
        return this.baseTypedSendMessage(ctx, text, extra);
      };

      ctx.typedSendMessage = typedSendMessage;
      return next();
    };
  }

  async baseTypedSendMessage(ctx: IContext, text: I18nPath, extra?: IExtraTextOptions) {
    const phrase = this.translate.findPhrase(text, ctx.session.lang, extra?.args) as I18nPath;
    const chatId = String(ctx.chat.id);

    try {
      return await ctx.telegram.sendMessage(chatId, phrase, {
        ...extra,
        parse_mode: 'HTML',
        reply_to_message_id: extra?.reply ? ctx.message.message_id : undefined,
      });
    } catch (e) {
      Logger.error(e, `SEND MESSAGE`);
    }
  }
}
