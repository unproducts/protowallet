import { Entities } from './entities-lookup';
import { Repository } from './repositories/base';
import { ApplicationFeed } from './feeds';
import { AccountRepository, CategoryRepository, LabelRepository, RecurringTransactionRepository, TransactionRepository } from './repositories';
import { BudgetRepository } from './repositories/budget';
import { PrefsProvider } from './services/prefs-manager';

export type RepositoryProvider = (entity: Entities) => Repository<any>;
export type RepositoryProviderMaker = (applicationFeed: ApplicationFeed, prefs: PrefsProvider) => RepositoryProvider;

export const makeProvider: RepositoryProviderMaker = (applicationFeed: ApplicationFeed, prefsProvider: PrefsProvider): RepositoryProvider => {
  const repositoryCache: Map<Entities, Repository<any>> = new Map();
  const get = (entity: Entities) => {
    if (!repositoryCache.get(entity)) {
      switch (entity) {
        case Entities.Account:
          repositoryCache.set(entity, new AccountRepository(applicationFeed.accounts, prefsProvider));
          break;
        case Entities.Budget:
          repositoryCache.set(entity, new BudgetRepository(applicationFeed.budgets, prefsProvider));
          break;
        case Entities.Category:
          repositoryCache.set(entity, new CategoryRepository(applicationFeed.categories, prefsProvider));
          break;
        case Entities.Label:
          repositoryCache.set(entity, new LabelRepository(applicationFeed.labels, prefsProvider));
          break;
        case Entities.Transaction:
          const accountsRepository = get(Entities.Account) as AccountRepository;
          repositoryCache.set(entity, new TransactionRepository(applicationFeed.transactions, accountsRepository, prefsProvider));
          break;
        case Entities.RecurringTransaction:
          const accountsRepository2 = get(Entities.Account) as AccountRepository;
          repositoryCache.set(entity, new RecurringTransactionRepository(applicationFeed.recurringTransactions, accountsRepository2, prefsProvider));
          break;
        default:
          throw new Error(`Repository for ${entity} not found`);
      }
    }
    return repositoryCache.get(entity) as Repository<any>;
  };
  return get;
};
