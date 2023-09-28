import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export type IExtraTextOptions = {
  reply?: boolean;
  args?: any;
  chatId?: string;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup;
};
