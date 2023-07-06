import { Collection } from "lokijs";

import { IdEntity } from "@protowallet/types";
import { EntityCreationException, EntityUpdateException } from "@protowallet/common";

export type UpdateDTO<T extends IdEntity> = Omit<Partial<T>, 'id'>;

export interface Repository<T extends IdEntity> {
    get(id: number): Promise<T | null>;
    getAll(): Promise<T[]>;
    count(): Promise<number>;

    delete(id: number): Promise<void>;

    getUnderlyingFeed(): Promise<Collection<T>>;
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
        })
    }

    async getAll(): Promise<T[]> {
        return this.feed.find();
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

    async getUnderlyingFeed(): Promise<Collection<T>> {
        return this.feed;
    }

    protected async save(entity: T): Promise<T> {
        await this.validate(entity);
        const savedEntity = this.feed.insert(entity);
        if (savedEntity) {
            return savedEntity;
        }
        throw EntityCreationException(this.feed.name);
    }

    protected async update(entity: T): Promise<T> {
        await this.validate(entity);
        const updatedEntity = this.feed.update(entity);
        if (updatedEntity) {
            return updatedEntity;
        }
        throw EntityUpdateException(this.feed.name);
    }

    abstract validate(entity: T): Promise<void>;
}