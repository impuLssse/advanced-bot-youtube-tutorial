import { Logger } from '@nestjs/common';
import { IContext, MiddlewareFunction } from '@shared/types';
import { TranslateService } from '@translate';
import { NextFunction } from 'express';
import { Keyboard } from './keyboard.class';

export class CoreExtra {
  reactiveCallbackButton(): MiddlewareFunction {
    return async (ctx: IContext, next: NextFunction) => {
      if (ctx.updateType == 'callback_query') {
        try {
          await ctx.answerCbQuery();
        } catch (e) {
          Logger.error(e, `Reactive callback`);
        }
      }

      return next();
    };
  }

  injectTypedKeyboard(translate: TranslateService): MiddlewareFunction {
    return async (ctx: IContext, next: NextFunction) => {
      ctx.k = new Keyboard(translate);
      return next();
    };
  }
}
