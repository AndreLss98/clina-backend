import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';

import { Room, ScheduleAvailability, ScheduleType, User } from '@prisma/client';

import { CreateRoomDto } from '../../controllers/room/dto/create-room.dto';
import { UpdateRoomDto } from '../../controllers/room/dto/update-room.dto';
import { PrismaService } from '../../database/prisma/prisma.service';
import { FilterRoomDto } from '../../controllers/room/dto/filter-room.dto';
import { enumToArray } from 'src/shared/functions';
import { JwtUser } from '../../controllers/auth/strategys/jwt-strategy';

@Injectable()
export class RoomService extends BaseService<
  Room,
  CreateRoomDto,
  UpdateRoomDto
> {
  public _repo: PrismaService['room'];
  constructor(protected prisma: PrismaService) {
    super(prisma);
    this._repo = prisma.room;
  }

  findAll(filters: FilterRoomDto): Promise<Room[]> {
    const { date, name, fromDate, toDate, dailyPeriod, ...rest } = filters;

    const generateFilter = (type) => ({
      where: {
        ...rest,
        ...(name && {
          name: {
            contains: name,
          },
        }),
        ...((date || fromDate) && {
          schedules: {
            ...(date && {
              none: {
                AND: [
                  {
                    fromDate: {
                      lte: new Date(date),
                    },
                  },
                  {
                    toDate: {
                      gte: new Date(date),
                    },
                  },
                  {
                    period: {
                      equals: type,
                    },
                    availability: {
                      not: ScheduleAvailability.UNAVAILABLE,
                    },
                  },
                ],
              },
            }),
            ...(fromDate && {
              none: {
                OR: [
                  {
                    fromDate: {
                      gte: new Date(fromDate),
                      lte: new Date(toDate),
                    },
                    AND: {
                      period: {
                        equals: type,
                      },
                      availability: {
                        not: ScheduleAvailability.UNAVAILABLE,
                      },
                    },
                  },
                  {
                    toDate: {
                      gte: new Date(fromDate),
                      lte: new Date(toDate),
                    },
                    AND: {
                      period: {
                        equals: type,
                      },
                      availability: {
                        not: ScheduleAvailability.UNAVAILABLE,
                      },
                    },
                  },
                ],
              },
            }),
          },
        }),
      },
    });

    return dailyPeriod
      ? super.findAll(generateFilter(dailyPeriod))
      : Promise.all(
          enumToArray(ScheduleType).map((type) =>
            super.findAll(generateFilter(type)),
          ),
        ).then((result) =>
          result
            .reduce((acc, curr) => [...acc, ...curr], [])
            .filter(
              (value, index, self) =>
                index === self.findIndex((curr) => curr.id === value.id),
            ),
        );
  }

  getById(id: number): Promise<Room> {
    return super.getById(id, {
      address: true,
      photos: true,
      schedules: true,
    });
  }

  create(body: CreateRoomDto, user: JwtUser): Promise<Room> {
    const { address, photos, ...room } = body;
    return super.create(
      {
        ...room,
        address: {
          create: address,
        },
        photos: {
          create: photos,
        },
      },
      user,
    );
  }

  update(id: number, body: UpdateRoomDto): Promise<Room> {
    const { address, photos, ...room } = body;
    return super.update(id, {
      ...room,
      ...(address && {
        address: {
          update: address,
        }
      }),
      ...(photos && {
        photos: this.upsert(photos),
      })
    });
  }
}
