import { TranslateService } from '@translate';
import { Buttons, Keyboard as BaseKeyboard, MakeOptions, Key, CallbackButton } from 'telegram-keyboard';
import {
  ButtonsStack,
  I18nPath,
  IButton,
  IContext,
  IContextTypedKeyboard,
  InlineKeyboard,
  Langs,
  RemoveKeyboard,
} from '@shared/types';

export class Keyboard implements IContextTypedKeyboard {
  constructor(private translate: TranslateService) {}

  /** Создание типизированой **инлайн** клавиатуры
   * * Пишем ключ кнопки, например в файл `libs/locales/en/buttons.json`
   * * Затем это генерируется - от `libs/shared/types/translate.types.generated.ts`
   * * Эта типизация нужна по 2-ум причинам: контракт и перевод
   *
   * @example
   * // Можно указывать строками
   * await ctx.sendMessage(enterPhrase, {
   *       ...extra.makeInlineKeyboard(['buttons.products', 'buttons.back'], 'ru'),
   *   });
   *
   * // Либо объектами интерфеса IButton
   * await ctx.sendMessage(enterPhrase, {
   *       ...extra.makeInlineKeyboard([{ text: 'buttons.products' }, { text: 'buttons.back' }], 'ru'),
   *   });
   *
   * // В два ряда
   * await ctx.sendMessage(enterPhrase, {
   *       ...extra.makeInlineKeyboard([
   *     [{ text: 'buttons.products' }, { text: 'buttons.admin' }],
   *     [{ text: 'buttons.products' }, { text: 'buttons.back' }]
   * ], 'en'),
   *   });
   *
   * // Можно совмещать
   * await ctx.sendMessage(enterPhrase, {
   *       ...extra.makeInlineKeyboard([
   *     [{ text: 'buttons.products' }, { text: 'buttons.admin' }],
   *     ['buttons.products', 'buttons.back']
   * ], 'en'),
   *   });
   */
  typedInlineKeyboard(
    buttons: ButtonsStack,
    ctx: IContext,
    makeOptions?: Partial<MakeOptions>,
  ): InlineKeyboard {
    return this.typedKeyboard(buttons, ctx, makeOptions).inline();
  }

  /** Создание нетипизированной обычной инлайн клавиатуры */
  simpleInlineKeyboard(
    buttons: Buttons,
    template?: string,
    makeOptions?: Partial<MakeOptions>,
  ): InlineKeyboard {
    return this.simpleKeyboard(buttons, template, makeOptions).inline();
  }

  /** Создание типизированой клавиатуры */
  typedKeyboard(buttons: ButtonsStack, ctx: IContext, makeOptions?: Partial<MakeOptions>): BaseKeyboard {
    const parsedButtons = this.toTypedKeyboard(buttons, ctx.session.lang);
    return BaseKeyboard.make(parsedButtons as CallbackButton[], makeOptions as MakeOptions);
  }

  /** Создание нетипизированной обычной клавиатуры */
  simpleKeyboard(buttons: Buttons, template?: string, makeOptions?: Partial<MakeOptions>): BaseKeyboard {
    if (template) {
      const buttonsFromFactory = this.factoryCallbackData(buttons, template);
      return BaseKeyboard.make(buttonsFromFactory, makeOptions as MakeOptions);
    }

    return BaseKeyboard.make(buttons, makeOptions as MakeOptions);
  }

  removeKeyboard(): RemoveKeyboard {
    return BaseKeyboard.remove();
  }

  combineKeyboard(...keyboards: BaseKeyboard[]): BaseKeyboard {
    return BaseKeyboard.combine(...keyboards);
  }

  private toCallbackButton(button: IButton, lang: Langs): CallbackButton {
    const translatedText = this.translate.findPhrase(button.text, lang, button.args);

    return {
      text: translatedText,
      callback_data: button.callback_data ?? button.text,
      hide: button.hide ?? false,
    };
  }

  private toTypedKeyboard(buttons: ButtonsStack, lang: Langs) {
    return buttons.map((button: I18nPath | I18nPath[] | IButton | IButton[]) => {
      if (typeof button == 'string') {
        return this.toCallbackButton({ text: button }, lang);
      }

      if (Array.isArray(button)) {
        return button.map((btn: string | IButton) =>
          typeof btn == 'string'
            ? this.toCallbackButton({ text: btn as I18nPath }, lang)
            : this.toCallbackButton(btn, lang),
        );
      }

      if (typeof button == 'object') {
        return this.toCallbackButton(button as IButton, lang);
      }
    });
  }

  private factoryCallbackData(buttons: Buttons, template?: string) {
    return buttons.map((button: any) => {
      if (typeof button == 'string') {
        return Key.callback(button, template + button);
      }

      if (Array.isArray(button)) {
        return button.map((button) => Key.callback(button, template + button));
      }
    }) as CallbackButton[];
  }
}
