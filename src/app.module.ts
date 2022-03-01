import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './controllers/user/user.module';
import { AuthModule } from './controllers/auth/auth.module';
import { RoomModule } from './controllers/room/room.module';
import { ScheduleModule } from './controllers/schedule/schedule.module';

@Module({
  imports: [UserModule, AuthModule, RoomModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
