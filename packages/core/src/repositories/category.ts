import { Category, DetailedCategory, IdEntity } from '@protowallet/types';
import { AbstractRepositoryAdapter } from './base';
import { EntityNotFoundException, EntityNotValidException, GeneralProtoException } from '@protowallet/common';
import { utils } from '@protowallet/common';

export type CreateCategoryOptions = Omit<Category, 'id' | 'createdAt'>;

// Updating logoId is disabled since parent cannot be edited and child cannot have logo.
export type UpdateCategoryOptions = Partial<Omit<Category, 'parent' | 'logoId' | 'createdAt'>> & IdEntity;

export class CategoryRepository extends AbstractRepositoryAdapter<Category> {
  constructor(feed: Collection<Category>) {
    super(feed);
  }

  async getAll_Detailed(): Promise<DetailedCategory[]> {
    const topLevelCategories: Category[] = await this.getAllTopLevel();
    topLevelCategories.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    const detailedCategories: DetailedCategory[] = [];
    for (let index = 0; index < topLevelCategories.length; index++) {
      const category = topLevelCategories[index];
      const underlyingCategories = await this.getAllWithParent(category.id);
      underlyingCategories.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

      detailedCategories.push({
        ...category,
        children: underlyingCategories,
      });
    }

    return detailedCategories;
  }

  async create(options: CreateCategoryOptions): Promise<Category> {
    const category: Category = {
      id: utils.generateRandomId(),
      title: options.title,
      parent: options.parent || 0,
      logoId: options.logoId || 0,
      createdAt: new Date(),
    };
    return this._save(category);
  }

  getAllTopLevel(): Promise<Category[]> {
    return this.getAllWithParent(0);
  }

  async getAllWithParent(parent: number): Promise<Category[]> {
    return this.feed.find({ parent: { $eq: parent } });
  }

  async update(options: UpdateCategoryOptions): Promise<Category> {
    const category = await this.get(options.id);
    if (!category) {
      throw EntityNotFoundException('Category', options.id);
    }
    if (category.parent == 0) {
      throw new GeneralProtoException('Top level categories cannot be modified. Tried modifying category: ' + category.id);
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
