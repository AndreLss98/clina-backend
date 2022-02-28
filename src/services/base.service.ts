import { HttpException, HttpStatus } from '@nestjs/common';
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

  findAll(): Promise<Entity[]> {
    return this._repo.findMany();
  };

  getById(id: number): Promise<Entity> {
    return this._repo.findUnique({
      where: { id }
    });
  };
  create(body: CreateDto): Promise<Entity> {
    return this._repo.create({  
      data: body
    });
  }
  update(id: number, body: UpdateDto): Promise<Entity> {
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
