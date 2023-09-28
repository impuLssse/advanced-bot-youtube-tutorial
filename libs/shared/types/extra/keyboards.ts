import { InlineKeyboardMarkup, ReplyKeyboardRemove } from 'telegraf/typings/core/types/typegram';

export type InlineKeyboard = {
  reply_markup: InlineKeyboardMarkup;
};

export type RemoveKeyboard = {
  reply_markup: ReplyKeyboardRemove;
};
