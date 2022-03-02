import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

import { CreateUserDto } from '../../controllers/user/dto/create-user.dto';
import { UpdateUserDto } from '../../controllers/user/dto/update-user.dto';
import { PrismaService } from '../../database/prisma/prisma.service';
import { BaseService } from '../base.service';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  constructor(
    protected prisma: PrismaService
  ) {
    super(prisma);
    this.prisma.$use(async (params, next) => {
      if (['create', 'upsert'].includes(params.action))
        params.args.data.password = await hash(params.args.data.password, 10)
      
      return await next(params);
    });

    this._repo = prisma.user;
  }

  getById(id: number, include?: any): Promise<User> {
    return super.getById(id, {
      schedules: true,
      rooms: true,
    });
  }

  getByEmail(email: string): Promise<User> {
    return this._repo.findFirst({
      where: { email }
    });
  }
}
