import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from '../../services/user/user.service';
import { PrismaService } from '../../database/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService]
})
export class UserModule {}
