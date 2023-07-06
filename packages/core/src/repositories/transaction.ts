import { IdEntity, StrictRange, Transaction } from '@protowallet/types';
import { AbstractRepositoryAdapter } from './base';
import { AccountRepository } from './account';
import { EntityNotFoundException, EntityNotValidException, utils } from '@protowallet/common';

export type CreateTransactionOptions = Omit<Transaction, 'id'>;
export type UpdateTransactionOptions = Omit<Partial<Transaction> & IdEntity, 'isRecurringTransaction'>;
export type FindTransactionsOptions = {
  dateRange: StrictRange<Date>;
  accounts?: number[];
  categories?: number[];
  labels?: number[];
  recordTypes?: number[];
  amountRange?: StrictRange<number>;
};

export class TransactionRepository extends AbstractRepositoryAdapter<Transaction> {
  protected accountsRepository: AccountRepository;

  constructor(feed: Collection<Transaction>, accountsRepository: AccountRepository) {
    super(feed);
    this.accountsRepository = accountsRepository;
  }

  async query(options: FindTransactionsOptions): Promise<Transaction[]> {
    const query: Record<string, any> = this.prepareQueryFromOptions(options);
    const transactions: Transaction[] = this.feed.find(query);
    return transactions;
  }

  async create(options: CreateTransactionOptions): Promise<Transaction> {
    const transaction: Transaction = {
      ...options,
      id: utils.generateRandomId(),
      isRecurringTransaction: false,
    };
    return this._save(transaction);
  }

  async update(options: UpdateTransactionOptions): Promise<Transaction> {
    const transaction = await this.get(options.id);
    if (!transaction) {
      throw EntityNotFoundException('Transaction', options.id);
    }
    transaction.accountId = options.accountId || transaction.accountId;
    transaction.type = options.type || transaction.type;
    transaction.category = options.category || transaction.category;
    transaction.amount = options.amount || transaction.amount;
    transaction.note = options.note || transaction.note;
    transaction.labels = options.labels || transaction.labels;
    return this._update(transaction);
  }

  async validate(entity: Transaction): Promise<void> {
    const case1 = !!(entity.id && entity.id > 0);
    const case2 = !!(entity.accountId && entity.accountId > 0);
    const case3 = !!(entity.type && entity.type >= 0);
    const case4 = !!(entity.category && entity.category >= 0);
    const case5 = !!entity.amount;
    const case6 = !!entity.createdAt;
    const isValidPartial = case1 && case2 && case3 && case4 && case5 && case6;
    if (!isValidPartial) {
      throw EntityNotValidException('Transaction', entity);
    }
    const account = await this.accountsRepository.get(entity.accountId);
    if (!account) {
      throw EntityNotFoundException('Account', entity.accountId);
    }
  }

  private prepareQueryFromOptions(options: FindTransactionsOptions) {
    const query: Record<string, any> = {
      $and: [
        {
          timestamp: {
            $gte: options.dateRange.from,
          },
        },
        {
          timestamp: {
            $lte: options.dateRange.to,
          },
        },
      ],
    };

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
