import { IContext } from '@libs/shared/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(ctx: IContext) {
    return await this.prisma.user.create({
      data: {
        chatId: String(ctx.chat.id),
        userId: String(ctx.from.id),
        username: ctx.from.username ?? 'Unnamed :(',
      },
    });
  }

  async findUser(where: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({ where });
  }

  async updateUser(data: Prisma.UserUpdateInput, userId: string) {
    return await this.prisma.user.update({
      data,
      where: {
        userId,
      },
    });
  }
}
