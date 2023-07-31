import { Budget, IdEntity } from '@protowallet/types';
import { AbstractRepositoryAdapter } from './base';
import { EntityNotFoundException, utils } from '@protowallet/common';
import { PrefsProvider } from '../services/prefs-manager';

export type CreateBudgetOptions = Omit<Budget, 'id' | 'createdAt' | 'isRecurring'>;
export type UpdateBudgetOptions = Partial<Omit<Budget, 'createdAt' | 'isRecurring'>> & IdEntity;

export class BudgetRepository extends AbstractRepositoryAdapter<Budget> {
  constructor(feed: Collection<Budget>, prefs: PrefsProvider) {
    super(feed, prefs);
  }

  async create(options: CreateBudgetOptions): Promise<Budget> {
    const budget: Budget = {
      ...options,
      id: utils.generateRandomId(),
      isRecurring: false,
      createdAt: new Date(),
    };
    return this._save(budget);
  }

  async update(options: UpdateBudgetOptions): Promise<Budget> {
    const budget = this.get(options.id);
    if (!budget) {
      throw EntityNotFoundException('Budget', options.id);
    }
    budget.title = options.title || budget.title;
    budget.amount = options.amount || budget.amount;
    budget.categories = options.categories || budget.categories;
    budget.labels = options.labels || budget.labels;
    budget.from = options.from || budget.from;
    budget.to = options.to || budget.to;
    budget.note = options.note || budget.note;
    return this._update(budget);
  }

  async validate(entity: Budget): Promise<void> {
    const case1 = !!(entity.id && entity.id > 0);
    const case2 = !!(entity.title && entity.title.length > 0);
    const case3 = !!entity.amount;
    const case4 = !!(entity.categories && entity.categories.length > 0);
    const case5 = !!(entity.labels && entity.labels.length > 0);
    const case6 = !!(entity.from && entity.from.getTime() > 0);
    const case7 = !!(entity.to && entity.to.getTime() > 0);
    const isValid = case1 && case2 && case3 && case4 && case5 && case6 && case7;
    if (!isValid) {
      throw new Error('Budget is not valid');
    }
  }

  protected entityLoadHook(entity: Budget): Budget {
    const updatedEntity = super.entityLoadHook(entity);
    updatedEntity.from = new Date(updatedEntity.from);
    updatedEntity.to = new Date(updatedEntity.to);
    return updatedEntity;
  }
}
