import { CalculatedAccount, StrictRange } from '@protowallet/types';
import { Entities } from '../entities-lookup';
import { AccountRepository } from '../repositories';
import { RepositoryProvider } from '../repository-provider';
import { TransactionAggregationsService, TransactionsGroupingService, TransactionsManager } from './transactions';
import { config } from '@protowallet/common';
import { Currency, RecordDirection } from '@protowallet/lookups';

export class AccountsService {
  private accountRepository: AccountRepository;
  private transactionsManager: TransactionsManager;
  private transactionsAggregatorService: TransactionAggregationsService;
  private transactionsGroupingService: TransactionsGroupingService;

  constructor(
    repositoriesProvider: RepositoryProvider,
    transactionManager: TransactionsManager,
    transactionsAggregatorService: TransactionAggregationsService,
    transactionsGroupingService: TransactionsGroupingService,
  ) {
    this.accountRepository = repositoriesProvider(Entities.Account) as AccountRepository;
    this.transactionsManager = transactionManager;
    this.transactionsAggregatorService = transactionsAggregatorService;
    this.transactionsGroupingService = transactionsGroupingService;
  }

  async getAllComputedAccounts(): Promise<CalculatedAccount[]> {
    const accounts = await this.accountRepository.getAll();
    const accountsLifespan = this.getAccountLifespan();
    const accountIds = accounts.map((account) => account.id);
    const transactions = await this.transactionsManager.query({
      dateRange: accountsLifespan,
      accounts: accountIds,
    });
    const transactionsByAccount = await this.transactionsGroupingService.groupTransactions_Accountwise(transactions);
    const balances = await this.transactionsAggregatorService.aggregateTransactionsGroupAmount(transactionsByAccount);
    return accounts.map((account) => ({
      ...account,
      balance: balances.get(account) || { value: 0, currency: Currency.INR, direction: RecordDirection.Right },
    }));
  }

  async getComputedAccount(accountId: number): Promise<CalculatedAccount> {
    const account = await this.accountRepository.getOrThrow(accountId);
    const accountLifespan = this.getAccountLifespan();
    const transactions = await this.transactionsManager.query({
      dateRange: accountLifespan,
      accounts: [account.id],
    });
    const balance = await this.transactionsAggregatorService.aggregateTransactionsAmount(transactions);
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
