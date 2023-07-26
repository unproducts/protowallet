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
    const matcher = this.prepareTxMatcherFnFromOptions(options);
    const recurringTransactions: RecurringTransaction[] = this.feed.chain().find().where(matcher).data().map(this.entityLoadHook);
    return recurringTransactions;
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
    transaction.startDate = options.startDate || transaction.startDate;
    transaction.labels = options.labels || transaction.labels;
    transaction.endTokenType = options.endTokenType || transaction.endTokenType;
    transaction.endToken = options.endToken || transaction.endToken;
    return this._update(transaction);
  }

  protected entityLoadHook(entity: RecurringTransaction): RecurringTransaction {
    const updatedEntity = super.entityLoadHook(entity);
    updatedEntity.startDate = new Date(updatedEntity.startDate);
    if (updatedEntity.endTokenType === EndRecurrenceBy.EndDate) {
      updatedEntity.endToken = new Date(updatedEntity.endToken as Date);
    }
    return updatedEntity;
  }

  async validate(entity: RecurringTransaction): Promise<void> {
    const case1 = !!(entity.id && entity.id > 0);
    const case2 = !!entity.title;
    const case3 = !!(entity.accountId && entity.accountId > 0);
    const case4 = !!entity.type;
    const case5 = !!(entity.category && entity.category >= 0);
    const case6 = !!entity.amount;
    const case7 = !!entity.createdAt;
    const case8 = !!entity.endTokenType;

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

  private prepareTxMatcherFnFromOptions(options: FindRecurringTransactionsOptions) {
    return (txRaw: RecurringTransaction) => {
      const tx = this.entityLoadHook(txRaw);
      const case1 = !options.accounts || options.accounts.includes(tx.accountId);
      const case2 = !options.categories || options.categories.includes(tx.category);
      const case3 = !options.labels || options.labels.some((label) => tx.labels.includes(label));
      const case4 = !options.recordTypes || options.recordTypes.includes(tx.type);
      return case1 && case2 && case3 && case4;
    };
  }

  // @ts-ignore keeping this for future reference
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
