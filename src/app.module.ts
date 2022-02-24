import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { PrismaService } from './database/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
