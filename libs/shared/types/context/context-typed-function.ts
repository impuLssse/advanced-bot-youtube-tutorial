import { I18nPath, IExtraTextOptions } from '@shared/types';
import { Message } from 'telegraf/typings/core/types/typegram';

export interface IContextTypedFunction {
  typedSendMessage: (text: I18nPath, extra?: IExtraTextOptions) => Promise<Message.TextMessage>;
  replyOrEdit: (text: I18nPath, extra?: IExtraTextOptions) => Promise<Message.TextMessage>;
  deleteMessage: () => Promise<true>;
}
