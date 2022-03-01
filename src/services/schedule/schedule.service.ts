import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, Schedule } from '@prisma/client';
import { FilterScheduleDto } from '../../controllers/schedule/dto/filter-schedules.dto';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateScheduleDto } from '../../controllers/schedule/dto/create-schedule.dto';
import { UpdateScheduleDto } from '../../controllers/schedule/dto/update-schedule.dto';
import { BaseService } from '../base.service';
import { RoomService } from '../room/room.service';

@Injectable()
export class ScheduleService extends BaseService<
  Schedule,
  CreateScheduleDto,
  UpdateScheduleDto
> {
  public _repo: PrismaClient['schedule'];
  constructor(
    protected prisma: PrismaService,
    private readonly _roomService: RoomService,
  ) {
    super(prisma);
    prisma.$use(async (params, next) => {
      if (params.action === 'create') {
        const { fromDate, toDate } = params.args.data;
        params.args.data.fromDate = new Date(fromDate);
        params.args.data.toDate = new Date(toDate);
      }

      return await next(params);
    });

    this._repo = prisma.schedule;
  }

  findAll(filters?: FilterScheduleDto): Promise<Schedule[]> {
    const filter = {
      where: {
        ...filters,
      },
    };

    return super.findAll(filter);
  }

  async create(body: CreateScheduleDto): Promise<Schedule> {
    const { roomId, fromDate, toDate, period } = body;

    const results = await this._roomService.findAll(
      { id: roomId, fromDate, toDate, dailyPeriod: period  }
    );

    if (!results.length) throw new HttpException('No vacancies for the requested period', HttpStatus.BAD_REQUEST);

    return super.create(body);
  }
}
