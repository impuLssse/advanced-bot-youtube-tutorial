import { SetMetadata, applyDecorators, UseGuards } from '@nestjs/common';
import { AuthOptions } from '../types';
import { AuthGuard } from '../guards';
import { MetadataContract } from '@libs/contracts';

/**
 * * Авторизация пользователя
 * */
export function Auth(authOptions?: AuthOptions) {
  return applyDecorators(SetMetadata(MetadataContract.AUTH_OPTIONS, authOptions), UseGuards(AuthGuard));
}
