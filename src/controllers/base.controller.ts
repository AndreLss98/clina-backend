import { BaseService } from "../services/base.service";

export abstract class BaseController<
  Entity,
  Service extends BaseService<Entity, CreateDto, UpdateDto>,
  CreateDto,
  UpdateDto
> {
  constructor(
    protected readonly _service: Service
  ) {}
  abstract getAll(): Promise<Entity[]>;

  abstract getById(id: number): Promise<Entity>;

  abstract create(body: CreateDto): Promise<Entity>;

  abstract update(
    id: number,
    body: UpdateDto
  ): Promise<Entity>;

  abstract delete(id: number): Promise<Entity>;
}