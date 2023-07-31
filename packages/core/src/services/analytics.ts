import { Amount, StrictRange } from '@protowallet/types';
import { TransactionAggregationsService, TransactionsManager } from './transactions';
import { RecordDirection, RecordType } from '@protowallet/lookups';
import { klass, utils } from '@protowallet/common';
import { PrefsProvider } from './prefs-manager';

export type IncomeExpenseCashFlowChartData = {
  dates: Date[];
  income: Amount[];
  expense: Amount[];
};

export class AnalyticsService {
  private transactionsManager: TransactionsManager;
  // private accountsService: AccountsService;
  private transactionsAggregatorService: TransactionAggregationsService;
  private prefsProvider: PrefsProvider;

  constructor(
    transactionsManager: TransactionsManager,
    // accountsService: AccountsService,
    transactionsAggregatorService: TransactionAggregationsService,
    prefsProvider: PrefsProvider,
  ) {
    this.transactionsManager = transactionsManager;
    // this.accountsService = accountsService;
    this.transactionsAggregatorService = transactionsAggregatorService;
    this.prefsProvider = prefsProvider;
  }

  async getIncomeExpenseCashFlowChartData(dateRange: StrictRange<Date>): Promise<IncomeExpenseCashFlowChartData> {
    const { from, to } = dateRange;
    const allDates: klass.TimelessDate[] = utils.getAllDatesBetween(from, to);
    const incomeTransactions = await this.transactionsManager.query({ dateRange, recordTypes: [RecordType.Income] });
    const expenseTransactions = await this.transactionsManager.query({ dateRange, recordTypes: [RecordType.Expense] });

    const [incomeData, expenseData] = await Promise.all([
      this.transactionsAggregatorService.aggregateTransactionAmountPerDay(allDates, incomeTransactions),
      this.transactionsAggregatorService.aggregateTransactionAmountPerDay(allDates, expenseTransactions),
    ]);

    return {
      dates: allDates.map((date) => date.toDate()),
      income: allDates.map((date) => incomeData.get(date) || { value: 0, currency: this.prefsProvider.getPreferredCurrency(), direction: RecordDirection.Right }),
      expense: allDates.map((date) => expenseData.get(date) || { value: 0, currency: this.prefsProvider.getPreferredCurrency(), direction: RecordDirection.Right })
    };
  }

  
}
