export interface IBaseService<T> {
  findAll(): Promise<T[]>;
  findOne(entity: T): Promise<T>;
  update(oldEntity: T, entity: T): Promise<T>;
  save(entity: T): Promise<T>;
  delete(entity: T);
}
