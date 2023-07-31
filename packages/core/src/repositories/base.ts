import { Collection } from 'lokijs';

import { GeneralTimestamedEntity, IdEntity } from '@protowallet/types';
import { EntityCreationException, EntityNotFoundException, EntityUpdateException } from '@protowallet/common';
import { PrefsProvider } from '../services/prefs-manager';

export type UpdateDTO<T extends IdEntity> = Omit<Partial<T>, 'id'>;

export interface Repository<T extends IdEntity & GeneralTimestamedEntity> {
  get(id: number): T | null;
  getAll(): T[];
  count(): number;
  getAllRecord(): Record<number, T>;
  
  delete(id: number): Promise<void>;

  getUnderlyingFeed(): Collection<T>;
  validate(entity: T): Promise<void>;
}

export abstract class AbstractRepositoryAdapter<T extends IdEntity & GeneralTimestamedEntity> implements Repository<T> {
  protected feed: Collection<T>;
  protected prefsProvider: PrefsProvider;

  constructor(feed: Collection<T>, prefs: PrefsProvider) {
    this.feed = feed;
    this.prefsProvider = prefs;
  }

  get(id: number): T | null {
    return this.entityLoadHook(this.feed.findOne({
      id: {
        $eq: id,
      },
    }) as T);
  }

  getOrThrow(id: number): T {
    const entity = this.get(id);
    if (entity) {
      return entity;
    }
    throw EntityNotFoundException(this.feed.name, id);
  }

  getAll(): T[] {
    return this.feed.find().map(this.entityLoadHook);
  }

  getAllRecord(): Record<number, T> {
    const entities = this.getAll();
    return this.recordify(entities);
  }

  count(): number {
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

  protected entityLoadHook(entity: T): T {
    // This is done because serialization/deserialization of LokiJS doesn't work well with Date objects
    // Any Date object entity has to be converted to a Date object like this.
    if (!entity) {
      return entity;
    }
    return {
      ...entity,
      createdAt: new Date(entity.createdAt),
    };
  }

  abstract validate(entity: T): Promise<void>;
}
