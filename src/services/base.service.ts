export abstract class BaseService<Entity, CreateDto, UpdateDto> {
  abstract findAll(): Promise<Entity[]>;
  abstract getById(id: number): Promise<Entity>;
  abstract create(body: CreateDto): Promise<Entity>;
  abstract update(id: number, body: UpdateDto): Promise<Entity>;
}
