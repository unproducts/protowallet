import { Entities } from './entities-lookup';
import { Repository } from './repositories/base';
import { ApplicationFeed } from './feeds';
import { AccountRepository, CategoryRepository, LabelRepository } from './repositories';

export type RepositoryProvider = (entity: Entities) => Repository<any> | null;
export type RepositoryProviderMaker = (applicationFeed: ApplicationFeed) => RepositoryProvider;

export const makeProvider: RepositoryProviderMaker = (applicationFeed: ApplicationFeed): RepositoryProvider => {
  const repositoryIndex: Record<Entities, Repository<any> | null> = {
    [Entities.Account]: new AccountRepository(applicationFeed.accounts),
    [Entities.Budget]: null,
    [Entities.Category]: new CategoryRepository(applicationFeed.categories),
    [Entities.Transaction]: null,
    [Entities.Label]: new LabelRepository(applicationFeed.labels),
    [Entities.RecurringBudget]: null,
    [Entities.RecurringTransaction]: null,
  };
  return (entity: Entities) => {
    return repositoryIndex[entity];
  };
};
