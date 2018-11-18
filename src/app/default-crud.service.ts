import {
  Repository,
  DeepPartial,
  FindManyOptions,
  ObjectID,
  FindOneOptions,
  SaveOptions,
} from 'typeorm';
import { Options } from './common-types';

export class DefaultCrudService<T> {
  constructor(private readonly repo: Repository<any>) {}

  findById(ids: any[], options: FindManyOptions): Promise<T[]> {
    return this.repo.findByIds(ids, options);
  }
  find(): Promise<T[]> {
    return this.repo.find({ skip: 2 });
  }
  findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions,
  ): Promise<T> {
    return this.repo.findOne(id, options);
  }

  create(entity: DeepPartial<T>): T {
    return this.repo.create();
  }
  createAll(entities: DeepPartial<T>[]): T[] {
    return this.repo.create(entities);
  }

  save(entity: T, options?: SaveOptions): Promise<T> {
    return this.repo.save(entity, options);
  }

  update() {
    return;
  }
  updateById(id, data, options) {}
  updateAll() {
    return;
  }

  replaceById() {}
  destroyById() {
    return;
  }
  destroyByIds() {}
  destroyAll() {}

  async count() {}

  async exists(ids: any[], options?: Options): Promise<boolean> {
    const results = await this.repo.findByIds(ids, options);
    return results.length > 0;
  }
}
