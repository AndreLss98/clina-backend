import { PrismaService } from './../database/prisma/prisma.service';

export abstract class BaseService<Entity, CreateDto, UpdateDto> {
  constructor(
    protected prisma: PrismaService
  ) { }

  abstract findAll(): Promise<Entity[]>;
  abstract getById(id: number): Promise<Entity>;
  abstract create(body: CreateDto): Promise<Entity>;
  abstract update(id: number, body: UpdateDto): Promise<Entity>;
  abstract delete(id: number): Promise<Entity>;
}
