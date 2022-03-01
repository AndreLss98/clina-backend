import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, Schedule, ScheduleAvailability } from '@prisma/client';
import { FilterScheduleDto } from '../../controllers/schedule/dto/filter-schedules.dto';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateScheduleDto } from '../../controllers/schedule/dto/create-schedule.dto';
import { UpdateScheduleDto } from '../../controllers/schedule/dto/update-schedule.dto';
import { BaseService } from '../base.service';
import { RoomService } from '../room/room.service';
import { JwtUser } from '../../controllers/auth/strategys/jwt-strategy';

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

  findAll(filters: FilterScheduleDto = {}): Promise<Schedule[]> {
    const { availability, ...rest } = filters;
    const filter = {
      where: {
        ...rest,
        ...(availability && {
          availability: {
            in: availability
          }
        })
      },
    };

    return super.findAll(filter);
  }

  async create(body: CreateScheduleDto, user: JwtUser): Promise<Schedule> {
    const { roomId, fromDate, toDate, period } = body;

    const roomsAvailable = await this._roomService.findAll(
      { id: roomId, fromDate, toDate, dailyPeriod: period  }
    );

    if (!roomsAvailable.length) throw new HttpException('No vacancies in this room for the requested period', HttpStatus.BAD_REQUEST);

    return super.create(body, user);
  }

  delete(id: number): Promise<Schedule> {
    return this._repo.update({
      where: {
        id,
      },
      data: {
        availability: ScheduleAvailability.UNAVAILABLE
      }
    })
  }
}
