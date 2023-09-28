import { I18nPath } from '@shared/types';
import { Hears } from 'nestjs-telegraf';

export function HearsContract(callback_data: I18nPath | I18nPath[]): MethodDecorator {
  if (Array.isArray(callback_data)) {
    const callback_datas = callback_data.map((callback_data) => {
      return callback_data.split('.').pop();
    });

    return Hears(callback_datas);
  } else {
    return Hears(callback_data.split('.').pop());
  }
}
