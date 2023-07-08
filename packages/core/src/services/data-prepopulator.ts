import { Entities } from '../entities-lookup';
import { CategoryRepository } from '../repositories';
import { RepositoryProvider } from '../repository-provider';
import { generateDefaultCategories } from '@protowallet/static-data';

export class DataPrepopulatorService {
  private repositoryProvider: RepositoryProvider;

  constructor(repositoryProvider: RepositoryProvider) {
    this.repositoryProvider = repositoryProvider;
  }

  async prepopulate() {
    await this.prepopulateCategories();
  }

  async prepopulateCategories() {
    const categoryRepository = this.repositoryProvider(Entities.Category) as CategoryRepository;
    const defaultCategories = generateDefaultCategories();

    const categoryFeed = categoryRepository.getUnderlyingFeed();

    categoryFeed.insert(defaultCategories);
  }
}
