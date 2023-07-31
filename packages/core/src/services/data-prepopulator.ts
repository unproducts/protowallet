import { Currency } from '@protowallet/lookups';
import { Entities } from '../entities-lookup';
import { AccountRepository, CategoryRepository } from '../repositories';
import { RepositoryProvider } from '../repository-provider';
import { generateDefaultCategories, generatePrefilledAccounts } from '@protowallet/static-data';
import { PrefsProvider } from './prefs-manager';

export class DataPrepopulatorService {
  private repositoryProvider: RepositoryProvider;
  private prefsProvider: PrefsProvider;

  constructor(repositoryProvider: RepositoryProvider, prefsProvider: PrefsProvider) {
    this.repositoryProvider = repositoryProvider;
    this.prefsProvider = prefsProvider;
  }

  async prepopulate() {
    await this.prepopulatePrefs();
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
    const defaultAccounts = generatePrefilledAccounts(this.prefsProvider.getPreferredCurrency());
    
    const accountFeed = accountRepository.getUnderlyingFeed();

    accountFeed.insert(defaultAccounts);
  }

  async prepopulatePrefs() {
    this.prefsProvider.setPrefs({
      currency: Currency.INR,
    });
  }
}
