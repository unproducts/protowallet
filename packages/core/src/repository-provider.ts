import { Entities } from './entities-lookup';
import { Repository } from './repositories/base';
import { ApplicationFeed } from './feeds';
import { AccountRepository, CategoryRepository, LabelRepository, RecurringTransactionRepository, TransactionRepository } from './repositories';

export type RepositoryProvider = (entity: Entities) => Repository<any>;
export type RepositoryProviderMaker = (applicationFeed: ApplicationFeed) => RepositoryProvider;

export const makeProvider: RepositoryProviderMaker = (applicationFeed: ApplicationFeed): RepositoryProvider => {
  const repositoryCache: Map<Entities, Repository<any>> = new Map();
  const get = (entity: Entities) => {
    if (repositoryCache.get(entity) === null) {
      switch (entity) {
        case Entities.Account:
          repositoryCache.set(entity, new AccountRepository(applicationFeed.accounts));
          break;
        case Entities.Category:
          repositoryCache.set(entity, new CategoryRepository(applicationFeed.categories));
          break;
        case Entities.Label:
          repositoryCache.set(entity, new LabelRepository(applicationFeed.labels));
          break;
        case Entities.Transaction:
          const accountsRepository = get(Entities.Account) as AccountRepository;
          repositoryCache.set(entity, new TransactionRepository(applicationFeed.transactions, accountsRepository));
          break;
        case Entities.RecurringTransaction:
          const accountsRepository2 = get(Entities.Account) as AccountRepository;
          repositoryCache.set(entity, new RecurringTransactionRepository(applicationFeed.recurringTransactions, accountsRepository2));
          break;
        default:
          throw new Error(`Repository for ${entity} not found`);
      }
    }
    return repositoryCache.get(entity) as Repository<any>;
  };
  return get;
};
