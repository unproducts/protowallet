import { Currency } from '@protowallet/lookups';
import { Entities } from '../entities-lookup';
import { AccountRepository, CategoryRepository } from '../repositories';
import { RepositoryProvider } from '../repository-provider';
import { generateDefaultCategories, generatePrefilledAccounts } from '@protowallet/static-data';

export class DataPrepopulatorService {
  private repositoryProvider: RepositoryProvider;

  constructor(repositoryProvider: RepositoryProvider) {
    this.repositoryProvider = repositoryProvider;
  }

  async prepopulate() {
    Promise.all([
      this.prepopulateCategories(),
      this.prepopulateAccounts(),
    ]);
  }

  async prepopulateCategories() {
    const categoryRepository = this.repositoryProvider(Entities.Category) as CategoryRepository;
    const defaultCategories = generateDefaultCategories();

    const categoryFeed = categoryRepository.getUnderlyingFeed();

    categoryFeed.insert(defaultCategories);
  }

  async prepopulateAccounts() {
    const accountRepository = this.repositoryProvider(Entities.Account) as AccountRepository;
    const defaultAccounts = generatePrefilledAccounts(Currency.INR);
    
    const accountFeed = accountRepository.getUnderlyingFeed();

    accountFeed.insert(defaultAccounts);
  }
}
