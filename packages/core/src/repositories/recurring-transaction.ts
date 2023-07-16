import { IdEntity, RecurringTransaction, StrictRange } from '@protowallet/types';
import { AbstractRepositoryAdapter } from './base';
import { EntityNotFoundException, EntityNotValidException, utils } from '@protowallet/common';
import { AccountRepository } from './account';
import { EndRecurrenceBy } from '@protowallet/lookups';

export type CreateRecurringTransactionOptions = Omit<RecurringTransaction, 'id'>;
export type UpdateRecurringTransactionOptions = Partial<RecurringTransaction> & IdEntity;
export type FindRecurringTransactionsOptions = {
  accounts?: number[];
  categories?: number[];
  labels?: number[];
  recordTypes?: string[];
  amountRange?: StrictRange<number>;
};

export class RecurringTransactionRepository extends AbstractRepositoryAdapter<RecurringTransaction> {
  protected accountsRepository: AccountRepository;

  constructor(feed: Collection<RecurringTransaction>, accountsRepository: AccountRepository) {
    super(feed);
    this.accountsRepository = accountsRepository;
  }

  async create(options: CreateRecurringTransactionOptions): Promise<RecurringTransaction> {
    const transaction: RecurringTransaction = {
      ...options,
      id: utils.generateRandomId(),
    };
    return this._save(transaction);
  }

  async query(options: FindRecurringTransactionsOptions): Promise<RecurringTransaction[]> {
    const query: Record<string, any> = this.prepareQueryFromOptions(options);
    const RecurringTransactions: RecurringTransaction[] = this.feed.find(query).map(this.entityLoadHook);
    return RecurringTransactions;
  }

  async update(options: UpdateRecurringTransactionOptions): Promise<RecurringTransaction> {
    const transaction = await this.get(options.id);
    if (!transaction) {
      throw EntityNotFoundException('RecurringTransaction', options.id);
    }
    transaction.accountId = options.accountId || transaction.accountId;
    transaction.title = options.title || transaction.title;
    transaction.type = options.type || transaction.type;
    transaction.category = options.category || transaction.category;
    transaction.amount = options.amount || transaction.amount;
    transaction.labels = options.labels || transaction.labels;
    transaction.endTokenType = options.endTokenType || transaction.endTokenType;
    transaction.endToken = options.endToken || transaction.endToken;
    return this._update(transaction);
  }

  async validate(entity: RecurringTransaction): Promise<void> {
    const case1 = !!(entity.id && entity.id > 0);
    const case2 = !!entity.title;
    const case3 = !!(entity.accountId && entity.accountId > 0);
    const case4 = !!(entity.type);
    const case5 = !!(entity.category && entity.category >= 0);
    const case6 = !!entity.amount;
    const case7 = !!entity.createdAt;
    const case8 = entity.endTokenType >= 0;

    let caseValidEndRecurrenceBy = false;
    if (entity.endTokenType === EndRecurrenceBy.Count) {
      caseValidEndRecurrenceBy = typeof entity.endToken === 'number' && entity.endToken > 0;
    } else if (entity.endTokenType === EndRecurrenceBy.EndDate) {
      caseValidEndRecurrenceBy = typeof entity.endToken === 'object' && !!entity.endToken;
    } else if (entity.endTokenType === EndRecurrenceBy.NeverEnd) {
      caseValidEndRecurrenceBy = true;
    }

    const isValidPartial = case1 && case2 && case3 && case4 && case5 && case6 && case7 && case8 && caseValidEndRecurrenceBy;
    if (!isValidPartial) {
      throw EntityNotValidException('RecurringTransaction', entity);
    }

    const account = await this.accountsRepository.get(entity.accountId);
    if (!account) {
      throw EntityNotFoundException('Account', entity.accountId);
    }
  }

  private prepareQueryFromOptions(options: FindRecurringTransactionsOptions) {
    const query: Record<string, any> = {};

    if (options.accounts) {
      query.accountId = {
        $in: options.accounts,
      };
    }
    if (options.categories) {
      query.category = {
        $in: options.categories,
      };
    }

    return query;
  }
}
