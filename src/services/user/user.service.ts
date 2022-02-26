import { Injectable } from '@nestjs/common';
import { User, PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

import { CreateUserDto } from '../../controllers/user/dto/create-user.dto';
import { UpdateUserDto } from '../../controllers/user/dto/update-user.dto';
import { PrismaService } from '../../database/prisma/prisma.service';
import { BaseService } from '../base.service';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  private readonly _repo: PrismaClient['user'];
  constructor(
    protected prisma: PrismaService
  ) {
    super(prisma);
    this.prisma.$use(async (params, next) => {
      if (params.action == 'create')
        params.args.data.password = await hash(params.args.data.password, 10)
      
      return next(params)
    })

    this._repo = prisma.user;
  }

  findAll(): Promise<User[]> {
    return this._repo.findMany();
  }

  getById(id: number): Promise<User> {
    return this._repo.findFirst({
      where: { id }
    });
  }

  getByEmail(email: string): Promise<User> {
    return this._repo.findFirst({
      where: { email }
    });
  }

  create(body: CreateUserDto): Promise<User> {
    return this._repo.create({  
      data: body
    });
  }

  update(id: number, body: UpdateUserDto): Promise<User> {
    return this._repo.update({
      where: { id },
      data: body
    });
  }

  delete(id: number): Promise<User> {
    return this._repo.delete({
      where: { id }
    });
  }
}
