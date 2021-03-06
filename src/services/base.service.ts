import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtUser } from '../controllers/auth/strategys/jwt-strategy';
import { PrismaService } from './../database/prisma/prisma.service';

export abstract class BaseService<Entity, CreateDto, UpdateDto> {
  public _repo;
  constructor(
    protected prisma: PrismaService
  ) {
    this.prisma.$use(async (params, next) => {
      const result = await next(params);
      if (!result) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
      return result
    });
  }

  findAll(filters?: any): Promise<Entity[]> {
    return this._repo.findMany(filters);
  };

  getById(id: number, include?: any): Promise<Entity> {
    return this._repo.findUnique({
      where: { id },
      ...(include && {
        include
      })
    });
  };
  create(body: CreateDto | any, user?: JwtUser): Promise<Entity> {
    return this._repo.create({
      data: {
        ...body,
        ...(user && { userId: user.userId })
      }
    });
  }
  update(id: number, body: UpdateDto | any): Promise<Entity> {
    return this._repo.update({
      where: { id },
      data: body
    });
  }
  delete(id: number): Promise<Entity> {
    return this._repo.delete({
      where: { id }
    });
  }

  protected upsert(obj: any): { update: any[], create: any[] } {
    return {
      update: obj.filter(element => element.id).map(({id, ...data}) => ({ where: { id }, data })),
      create: obj.filter(element => !element.id)
    }
  }
}
