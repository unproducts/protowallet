import { CalculatedAccount, StrictRange } from '@protowallet/types';
import { Entities } from '../entities-lookup';
import { AccountRepository } from '../repositories';
import { RepositoryProvider } from '../repository-provider';
import { TransactionAggregationsService, TransactionsGroupingService, TransactionsManager } from './transactions';
import { config } from '@protowallet/common';
import { RecordDirection } from '@protowallet/lookups';
import { PrefsProvider } from './prefs-manager';

export class AccountsService {
  private accountRepository: AccountRepository;
  private transactionsManager: TransactionsManager;
  private transactionsAggregatorService: TransactionAggregationsService;
  private transactionsGroupingService: TransactionsGroupingService;
  private prefsProvider: PrefsProvider;

  constructor(
    repositoriesProvider: RepositoryProvider,
    transactionManager: TransactionsManager,
    transactionsAggregatorService: TransactionAggregationsService,
    transactionsGroupingService: TransactionsGroupingService,
    prefsProvider: PrefsProvider,
  ) {
    this.accountRepository = repositoriesProvider(Entities.Account) as AccountRepository;
    this.transactionsManager = transactionManager;
    this.transactionsAggregatorService = transactionsAggregatorService;
    this.transactionsGroupingService = transactionsGroupingService;
    this.prefsProvider = prefsProvider;
  }

  async getAllComputedAccounts(limit: number = 0): Promise<CalculatedAccount[]> {
    let accounts = this.accountRepository.getAll();
    if (limit) {
      accounts = accounts.slice(0, limit);
    }
    const allAccountsRecord = this.accountRepository.getAllRecord();
    const accountsLifespan = this.getAccountLifespan();
    const accountIds = accounts.map((account) => account.id);
    const transactions = await this.transactionsManager.query({
      dateRange: accountsLifespan,
      accounts: accountIds,
    });
    const transactionsByAccount = await this.transactionsGroupingService.groupTransactions_Accountwise(transactions);
    const balances = await this.transactionsAggregatorService.aggregateTransactionsGroupAmount(transactionsByAccount, a => allAccountsRecord[a]?.initialBalance.value);
    return accounts.map((account) => ({
      ...account,
      balance: balances.get(account.id) || { value: 0, currency: this.prefsProvider.getPreferredCurrency(), direction: RecordDirection.Right },
    }));
  }

  async getComputedAccount(accountId: number): Promise<CalculatedAccount> {
    const account = this.accountRepository.getOrThrow(accountId);
    const accountLifespan = this.getAccountLifespan();
    const transactions = await this.transactionsManager.query({
      dateRange: accountLifespan,
      accounts: [account.id],
    });
    const balance = await this.transactionsAggregatorService.aggregateTransactionsAmount(transactions, account.initialBalance.value);
    return {
      ...account,
      balance,
    };
  }

  getAccountLifespan(): StrictRange<Date> {
    return {
      from: config.DATE_OF_INCEPTION,
      to: new Date(),
    };
  }
}
