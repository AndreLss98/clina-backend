import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './../database/prisma/prisma.service';

export abstract class BaseService<Entity, CreateDto, UpdateDto> {
  constructor(
    protected prisma: PrismaService
  ) {
    this.prisma.$use(async (params, next) => {
      const result = await next(params);
      if (!result) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
      return result
    });
  }

  abstract findAll(): Promise<Entity[]>;
  abstract getById(id: number): Promise<Entity>;
  abstract create(body: CreateDto): Promise<Entity>;
  abstract update(id: number, body: UpdateDto): Promise<Entity>;
  abstract delete(id: number): Promise<Entity>;
}
