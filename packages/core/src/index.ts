import loki from 'lokijs';

import { Entities } from './entities-lookup';
import { ApplicationFeed, getFeed, initializeFeed } from './feeds';
import { RepositoryProvider, makeProvider } from './repository-provider';
import {
  AccountsService,
  RecurringEntityFlattener,
  TransactionAggregationsService,
  TransactionsGroupingService,
  TransactionsManager,
} from './services';
import { DataPrepopulatorService } from './services/data-prepopulator';
import { ApplicationMode } from '@protowallet/types';
import { PersistenceService } from './services/persistence';

export type ProtowalletOptions = {
  dbName: string;
  protoServerUrl?: string;
  mode: ApplicationMode;
};

export { Entities as EntitiesEnum } from './entities-lookup';

export class Protowallet {
  private options: ProtowalletOptions;

  private applicationFeed: ApplicationFeed;
  private repositoryProvider: RepositoryProvider;
  private lokiDb: loki;

  private dataPrepopulatorService: DataPrepopulatorService | null = null;
  private persistenceService: PersistenceService | null = null;

  private accountsService: AccountsService | null = null;

  private recurringEntityFlattener: RecurringEntityFlattener | null = null;

  private transactionManager: TransactionsManager | null = null;
  private transactionAggregatorService: TransactionAggregationsService | null = null;
  private transactionGroupingService: TransactionsGroupingService | null = null;

  private constructor(options: ProtowalletOptions, lokiDb: Loki, isNewDatabase: boolean) {
    this.options = options;

    this.lokiDb = lokiDb;

    this.applicationFeed = getFeed(this.lokiDb);
    this.repositoryProvider = makeProvider(this.applicationFeed);

    isNewDatabase && this.getDataPrepopulatorService().prepopulate();
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

  getPersistenceService() {
    if (this.persistenceService === null) {
      this.persistenceService = new PersistenceService(this.lokiDb, this.options.mode, this.options.protoServerUrl);
    }
    return this.persistenceService;
  }

  getUnderlyingDb() {
    return this.lokiDb;
  }

  static async create(options: ProtowalletOptions): Promise<Protowallet> {
    const { dbName, mode } = options;
    const dbUnderlyingName = dbName + '.protodb';
    const isNewDb = await checkNewDb(dbUnderlyingName, mode);
    const lokiDb = await getDb(dbUnderlyingName, mode, isNewDb);
    return new Protowallet(options, lokiDb, isNewDb);
  }
}

const checkNewDb = async (dbName: string, mode: ApplicationMode) => {
  if (mode === 'web') {
    const db = localStorage.getItem(dbName);
    return !db;
  }
  return true;
};

const getDb = (dbName: string, mode: ApplicationMode, isNewDb: boolean): Promise<Loki> => {
  return new Promise((resolve, reject) => {
    let adapter: LokiPersistenceAdapter;
    if (mode === 'web') {
      adapter = new loki.LokiLocalStorageAdapter();
    } else {
      adapter = new loki.LokiFsAdapter();
    }

    const lokiDb: Loki = new loki(dbName, { adapter });

    if (isNewDb) {
      initializeFeed(lokiDb);
      resolve(lokiDb);
    } else {
      lokiDb.loadDatabase({}, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(lokiDb);
        }
      });
    }
  });
};
