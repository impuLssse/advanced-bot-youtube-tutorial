import { Module, NotFoundException } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { AcceptLanguageResolver, I18nJsonLoader, I18nModule, QueryResolver } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        fallbackLanguage: config.get<string>('FALLBACK_LANGUAGE'),
        fallbacks: {
          'en-*': 'en',
          'ru-*': 'ru',
        },
        loaderOptions: {
          path: join(__dirname, '../../../libs/locales/'),
          watch: true,
          includeSubfolders: true,
        },
        typesOutputPath: join(__dirname, '../../../libs/shared/types/translate.types.generated.ts'),
        catch(onrejected) {
          throw new NotFoundException(onrejected);
        },
      }),
      loader: I18nJsonLoader,
      inject: [ConfigService],
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
    }),
  ],
  providers: [TranslateService],
  exports: [TranslateService],
})
export class TranslateModule {}
