import { Category, IdEntity } from '@protowallet/types';
import { AbstractRepositoryAdapter } from './base';
import { EntityNotFoundException, EntityNotValidException } from '@protowallet/common';
import { utils } from '@protowallet/common';

export type CreateCategoryOptions = Omit<Category, 'id'>;

// Updating logoId is disabled since parent cannot be edited and child cannot have logo.
export type UpdateCategoryOptions = Partial<Omit<Category, 'parent' | 'logoId'>> & IdEntity;

export class CategoryRepository extends AbstractRepositoryAdapter<Category> {
  constructor(feed: Collection<Category>) {
    super(feed);
  }

  async create(options: CreateCategoryOptions): Promise<Category> {
    const category: Category = {
      id: utils.generateRandomId(),
      title: options.title,
      parent: options.parent || 0,
      logoId: options.logoId || 0,
    };
    return this._save(category);
  }

  async update(options: UpdateCategoryOptions): Promise<Category> {
    const category = await this.get(options.id);
    if (!category) {
      throw EntityNotFoundException('Category', options.id);
    }
    category.title = options.title || category.title;
    category.description = options.description || category.description;
    return this._update(category);
  }

  async validate(entity: Category): Promise<void> {
    const case1 = !!(entity.id && entity.id > 0);
    const case2 = !!(entity.title && entity.title.length > 0);
    let case3 = true;
    if (entity.parent == 0) {
      // Top level categories must have a logoId, irrelevant for child categories.
      case3 = !!(entity.logoId && entity.logoId > 0);
    }
    const isValid = case1 && case2 && case3;
    if (!isValid) {
      throw EntityNotValidException('Category', entity);
    }
  }
}
