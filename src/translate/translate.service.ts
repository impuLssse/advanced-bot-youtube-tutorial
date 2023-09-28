import { I18nPath, I18nTranslations, Langs } from '@shared/types';
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class TranslateService {
  constructor(private locales: I18nService<I18nTranslations>) {}

  /** Сервис по поиску перевода
   *  @param phrase ключ перевода
   *  @param lang название папки в `libs/locales`
   *  @param args любые аргументы, которые нужны для перевода
   *
   * @example
   * // Вернет перевод кнопки из папки 'ru' - 'назад'
   * const phrase = this.translate.findPhrase('buttons.back', 'ru');
   *
   * // Вернет приветствие из папки 'en' - 'Hello, impuLssse666!'
   * const phrase = this.translate.findPhrase('buttons.hello', 'en', { username: ctx.from.username });
   * */
  findPhrase(phrase: I18nPath, lang: Langs = 'ru', args?: any): string {
    return this.locales.translate(phrase, { lang, args }).toString();
  }
}
