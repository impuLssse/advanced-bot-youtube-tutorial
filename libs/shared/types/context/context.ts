import { I18nPath, IContextTypedFunction, IContextTypedKeyboard, Langs } from '@shared/types';
import { Context, Scenes } from 'telegraf';
import { CallbackQuery, Message, Update } from 'telegraf/typings/core/types/typegram';
import { SceneContextScene } from 'telegraf/typings/scenes';
import { User } from '@prisma/client';

type BaseContext = Context & IContextTypedFunction;

/**
 * * Context & Наш тип - значит что мы сможем использовать функции внутри `ctx`
 * @example ctx.typedSendMessage('text example')
 * */
export interface IContext extends BaseContext {
  update: Update.CallbackQueryUpdate & { message: Message.PhotoMessage };
  scene: ISceneContextScene;
  session: SessionData;
  message: Update.New & Update.NonChannel & Message & { text?: string } & Message.CommonMessage;
  callbackQuery: CallbackQuery & { data: string };

  k: IContextTypedKeyboard;
}

interface ISceneContextScene extends SceneContextScene<IContext, SceneSession> {
  enter: (sceneId: I18nPath) => Promise<unknown>;
}

export interface SessionData extends Scenes.SceneSession<SceneSession> {
  lang: Langs;
  user: User;
}

interface SceneSession extends Scenes.SceneSessionData {
  state: {
    token?: string;
  };
}
