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
  abstract getAll(filters?: any): Promise<Entity[]>;

  getById(id: number): Promise<Entity> {
    return this._service.getById(id);
  }

  abstract create(body: CreateDto): Promise<Entity>;

  abstract update(
    id: number,
    body: UpdateDto
  ): Promise<Entity>;

  abstract delete(id: number): Promise<Entity>;
}