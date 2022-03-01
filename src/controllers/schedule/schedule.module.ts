import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { RoomModule } from '../room/room.module';
import { ScheduleController } from './schedule.controller';

@Module({
  imports: [RoomModule],
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService]
})
export class ScheduleModule {}
