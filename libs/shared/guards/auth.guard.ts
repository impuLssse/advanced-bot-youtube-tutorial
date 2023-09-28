import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthOptions, IContext } from '../types';
import { MetadataContract } from '@libs/contracts';
import { Reflector } from '@nestjs/core';
import { BotService } from '@bot.service';
import { UserService } from '@user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private botService: BotService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { reflector, botService, userService } = this;

    const authOptions = reflector.get<AuthOptions, string>(
      MetadataContract.AUTH_OPTIONS,
      context.getHandler(),
    );

    const ctx = context.getArgByIndex<IContext>(0);

    if (authOptions?.resetBotSession) {
      botService.resetSession(ctx);
    }

    const userId = String(ctx.from.id);
    const foundUser = await userService.findUser({ userId });
    if (foundUser) {
      ctx.session.user = foundUser;
      return true;
    }

    // ! Не забываем что `chatId` в группе и лс разный
    if (ctx.chat.type !== 'private') {
      await ctx.sendMessage('Не зарегистрирован, отпиши мне в лс');
      return false;
    }

    const createdUser = await userService.createUser(ctx);
    ctx.session.user = createdUser;

    if (!createdUser) {
      Logger.error(`User cannot created`, `AUTH GUARD`);
      return false;
    }

    return true;
  }
}
