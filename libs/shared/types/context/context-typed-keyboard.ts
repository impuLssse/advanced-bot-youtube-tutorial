import { ButtonsStack, IContext, InlineKeyboard, RemoveKeyboard } from '@shared/types';
import { Buttons, Keyboard, MakeOptions } from 'telegram-keyboard';

export interface IContextTypedKeyboard {
  typedInlineKeyboard: (
    buttons: ButtonsStack,
    ctx: IContext,
    makeOptions?: Partial<MakeOptions>,
  ) => InlineKeyboard;

  typedKeyboard: (buttons: ButtonsStack, ctx: IContext, makeOptions?: Partial<MakeOptions>) => Keyboard;

  simpleInlineKeyboard: (
    buttons: Buttons,
    template?: string,
    makeOptions?: Partial<MakeOptions>,
  ) => InlineKeyboard;

  simpleKeyboard: (buttons: Buttons, template?: string, makeOptions?: Partial<MakeOptions>) => Keyboard;

  combineKeyboard: (...keyboards: Keyboard[]) => Keyboard;
  removeKeyboard: () => RemoveKeyboard;
}
