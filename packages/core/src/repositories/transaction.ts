import { IdEntity, StrictRange, Transaction } from '@protowallet/types';
import { AbstractRepositoryAdapter } from './base';
import { AccountRepository } from './account';
import { EntityNotFoundException, EntityNotValidException, utils } from '@protowallet/common';

export type CreateTransactionOptions = Omit<Transaction, 'id' | 'isRecurringTransaction'>;
export type UpdateTransactionOptions = Omit<Partial<Transaction> & IdEntity, 'isRecurringTransaction'>;
export type FindTransactionsOptions = {
  dateRange: StrictRange<Date>;
  accounts?: number[];
  categories?: number[];
  labels?: number[];
  recordTypes?: string[];
  amountRange?: StrictRange<number>;
};

export class TransactionRepository extends AbstractRepositoryAdapter<Transaction> {
  protected accountsRepository: AccountRepository;

  constructor(feed: Collection<Transaction>, accountsRepository: AccountRepository) {
    super(feed);
    this.accountsRepository = accountsRepository;
  }

  async query(options: FindTransactionsOptions): Promise<Transaction[]> {
    const matcher = this.prepareTxMatcherFnFromOptions(options);
    const transactions: Transaction[] = this.feed.chain().find().where(matcher).data().map(this.entityLoadHook);
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
    transaction.title = options.title || transaction.title;
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
    const case3 = !!entity.type;
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

  private prepareTxMatcherFnFromOptions(options: FindTransactionsOptions) {
    return (txRaw: Transaction) => {
      const tx = this.entityLoadHook(txRaw);
      const case1 = tx.createdAt >= options.dateRange.from;
      const case2 = tx.createdAt <= options.dateRange.to;
      const case3 = !options.accounts || options.accounts.includes(tx.accountId);
      const case4 = !options.categories || options.categories.includes(tx.category);
      const case5 = !options.labels || options.labels.some((label) => tx.labels.includes(label));
      const case6 = !options.recordTypes || options.recordTypes.includes(tx.type);
      return case1 && case2 && case3 && case4 && case5 && case6;
    };
  }

  // @ts-ignore Keeping this fn for now.
  private prepareQueryFromOptions(options: FindTransactionsOptions) {
    const query: Record<string, any> = {
      $and: [
        {
          createdAt: {
            $gte: options.dateRange.from,
          },
        },
        {
          createdAt: {
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
