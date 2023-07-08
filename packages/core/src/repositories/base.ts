import { Collection } from 'lokijs';

import { IdEntity } from '@protowallet/types';
import { EntityCreationException, EntityNotFoundException, EntityUpdateException } from '@protowallet/common';

export type UpdateDTO<T extends IdEntity> = Omit<Partial<T>, 'id'>;

export interface Repository<T extends IdEntity> {
  get(id: number): Promise<T | null>;
  getAll(): Promise<T[]>;
  count(): Promise<number>;
  getAllRecord(): Promise<Record<number, T>>;
  
  delete(id: number): Promise<void>;

  getUnderlyingFeed(): Collection<T>;
  validate(entity: T): Promise<void>;
}

export abstract class AbstractRepositoryAdapter<T extends IdEntity> implements Repository<T> {
  protected feed: Collection<T>;

  constructor(feed: Collection<T>) {
    this.feed = feed;
  }

  async get(id: number): Promise<T | null> {
    return this.feed.findOne({
      id: {
        $eq: id,
      },
    });
  }

  async getOrThrow(id: number): Promise<T> {
    const entity = await this.get(id);
    if (entity) {
      return entity;
    }
    throw EntityNotFoundException(this.feed.name, id);
  }

  async getAll(): Promise<T[]> {
    return this.feed.find();
  }

  async getAllRecord(): Promise<Record<number, T>> {
    const entities = await this.getAll();
    return this.recordify(entities);
  }

  async count(): Promise<number> {
    return this.feed.count();
  }

  async delete(id: number): Promise<void> {
    const entity = await this.get(id);
    if (entity) {
      this.feed.remove(entity);
    }
  }

  getUnderlyingFeed(): Collection<T> {
    return this.feed;
  }

  protected async _save(entity: T): Promise<T> {
    await this.validate(entity);
    const savedEntity = this.feed.insert(entity);
    if (savedEntity) {
      return savedEntity;
    }
    throw EntityCreationException(this.feed.name);
  }

  protected async _update(entity: T): Promise<T> {
    await this.validate(entity);
    const updatedEntity = this.feed.update(entity);
    if (updatedEntity) {
      return updatedEntity;
    }
    throw EntityUpdateException(this.feed.name);
  }

  protected recordify(entities: T[]): Record<number, T> {
    const entitiesRecord: Record<number, T> = {};
    for (let index = 0; index < entities.length; index++) {
      const entity = entities[index];
      entitiesRecord[entity.id] = entity;
    }
    return entitiesRecord;
  }

  abstract validate(entity: T): Promise<void>;
}
