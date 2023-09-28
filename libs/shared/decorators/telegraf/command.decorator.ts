import { Logger } from '@nestjs/common';
import { I18nPath } from '@shared/types';
import { Command } from 'nestjs-telegraf';

export function CommandContract(triggers: I18nPath, onlyDevMode?: boolean): MethodDecorator {
  const command = triggers.split('.')[1];

  if (onlyDevMode && !(process.env.NODE_ENV == 'dev')) {
    Logger.verbose(`This command ${command} will work only in dev mode 🤡`);
    return Command(`super_${command}`);
  }

  return Command(command);
}
