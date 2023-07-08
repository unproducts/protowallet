import loki from 'lokijs';

import { Entities } from './entities-lookup';
import { ApplicationFeed, initializeFeed } from './feeds';
import { RepositoryProvider, makeProvider } from './repository-provider';
import {
  AccountsService,
  RecurringEntityFlattener,
  TransactionAggregationsService,
  TransactionsGroupingService,
  TransactionsManager,
} from './services';
import { DataPrepopulatorService } from './services/data-prepopulator';

export type ProtowalletOptions = {
  dbName: string;
};

export { Entities as EntitiesEnum } from './entities-lookup';

export class Protowallet {
  private options: ProtowalletOptions;
  private applicationFeed: ApplicationFeed;
  private repositoryProvider: RepositoryProvider;

  private dataPrepopulatorService: DataPrepopulatorService | null = null;

  private accountsService: AccountsService | null = null;

  private recurringEntityFlattener: RecurringEntityFlattener | null = null;

  private transactionManager: TransactionsManager | null = null;
  private transactionAggregatorService: TransactionAggregationsService | null = null;
  private transactionGroupingService: TransactionsGroupingService | null = null;

  constructor(options: ProtowalletOptions) {
    this.options = options;

    const db = new loki(this.options.dbName);
    this.applicationFeed = initializeFeed(db);

    this.repositoryProvider = makeProvider(this.applicationFeed);

    this.getDataPrepopulatorService().prepopulate();
  }

  getRepository(entity: Entities) {
    return this.repositoryProvider(entity);
  }

  getDataPrepopulatorService() {
    if (this.dataPrepopulatorService === null) {
      this.dataPrepopulatorService = new DataPrepopulatorService(this.repositoryProvider);
    }
    return this.dataPrepopulatorService;
  }

  getAccountsService() {
    if (this.accountsService === null) {
      this.accountsService = new AccountsService(
        this.repositoryProvider,
        this.getTransactionsManager(),
        this.getTransactionAggregatorService(),
        this.getTransactionGroupingService(),
      );
    }
    return this.accountsService;
  }

  getRecurringEntityFlattener() {
    if (this.recurringEntityFlattener === null) {
      this.recurringEntityFlattener = new RecurringEntityFlattener();
    }
    return this.recurringEntityFlattener;
  }

  getTransactionsManager() {
    if (this.transactionManager === null) {
      this.transactionManager = new TransactionsManager(this.repositoryProvider, this.getRecurringEntityFlattener());
    }
    return this.transactionManager;
  }

  getTransactionAggregatorService() {
    if (this.transactionAggregatorService === null) {
      this.transactionAggregatorService = new TransactionAggregationsService();
    }
    return this.transactionAggregatorService;
  }

  getTransactionGroupingService() {
    if (this.transactionGroupingService === null) {
      this.transactionGroupingService = new TransactionsGroupingService(this.repositoryProvider);
    }
    return this.transactionGroupingService;
  }
}
