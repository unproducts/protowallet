import loki from 'lokijs';

import { Entities } from './entities-lookup';
import { ApplicationFeed, getFeed } from './feeds';
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
import { AnalyticsService } from './services/analytics';
import { PrefsProvider } from './services/prefs-manager';
import { applyMigrations } from './migrations/engine';

export type ProtowalletOptions = {
  dbName: string;
  protoServerUrl?: string;
  mode: ApplicationMode;
  dbAutoSaveCB?: () => void;
};

export { Entities as EntitiesEnum } from './entities-lookup';

export class Protowallet {
  private options: ProtowalletOptions;

  private applicationFeed: ApplicationFeed;
  private repositoryProvider: RepositoryProvider;
  private lokiDb: loki;

  private dataPrepopulatorService: DataPrepopulatorService | null = null;
  private persistenceService: PersistenceService | null = null;
  private prefsProviderService: PrefsProvider | null = null;

  private analyticsService: AnalyticsService | null = null;

  private accountsService: AccountsService | null = null;

  private recurringEntityFlattener: RecurringEntityFlattener | null = null;

  private transactionManager: TransactionsManager | null = null;
  private transactionAggregatorService: TransactionAggregationsService | null = null;
  private transactionGroupingService: TransactionsGroupingService | null = null;

  private constructor(options: ProtowalletOptions, lokiDb: Loki, isNewDatabase: boolean) {
    this.options = options;

    this.lokiDb = lokiDb;

    this.applicationFeed = getFeed(this.lokiDb);

    isNewDatabase && this.getDataPrepopulatorService().prepopulate();

    this.repositoryProvider = makeProvider(this.applicationFeed, this.getPrefsProviderService());
  }

  getRepository(entity: Entities) {
    return this.repositoryProvider(entity);
  }

  getDataPrepopulatorService() {
    if (this.dataPrepopulatorService === null) {
      this.dataPrepopulatorService = new DataPrepopulatorService(this.repositoryProvider, this.getPrefsProviderService());
    }
    return this.dataPrepopulatorService;
  }

  getAnalyticsService() {
    if (this.analyticsService === null) {
      this.analyticsService = new AnalyticsService(
        this.getTransactionsManager(),
        this.getTransactionAggregatorService(),
        this.getPrefsProviderService(),
      );
    }
    return this.analyticsService;
  }

  getAccountsService() {
    if (this.accountsService === null) {
      this.accountsService = new AccountsService(
        this.repositoryProvider,
        this.getTransactionsManager(),
        this.getTransactionAggregatorService(),
        this.getTransactionGroupingService(),
        this.getPrefsProviderService(),
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
      this.transactionAggregatorService = new TransactionAggregationsService(this.getPrefsProviderService());
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

  getPrefsProviderService() {
    if (this.prefsProviderService === null) {
      this.prefsProviderService = new PrefsProvider(this.applicationFeed);
    }
    return this.prefsProviderService;
  }

  getUnderlyingDb() {
    return this.lokiDb;
  }

  static async create(options: ProtowalletOptions): Promise<Protowallet> {
    const { dbName, mode } = options;
    const dbUnderlyingName = dbName + '.protodb';
    const isNewDb = await checkNewDb(dbUnderlyingName, mode);
    const lokiDb = await getDb(dbUnderlyingName, mode, isNewDb, options.dbAutoSaveCB);
    await applyMigrations(lokiDb);
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

const getDb = (dbName: string, mode: ApplicationMode, isNewDb: boolean, autosaveCb?: () => void): Promise<Loki> => {
  return new Promise((resolve, reject) => {
    let adapter: LokiPersistenceAdapter;
    if (mode === 'web') {
      adapter = new loki.LokiLocalStorageAdapter();
    } else {
      adapter = new loki.LokiFsAdapter();
    }

    const lokiDb: Loki = new loki(dbName, {
      adapter,
      autosave: true,
      autosaveInterval: 1000,
      autosaveCallback: autosaveCb,
    });

    if (!isNewDb) {
      lokiDb.loadDatabase({}, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(lokiDb);
        }
      });
    } else {
      resolve(lokiDb);
    }
  });
};
