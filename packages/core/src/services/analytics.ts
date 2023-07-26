import { Amount, StrictRange } from '@protowallet/types';
import { TransactionAggregationsService, TransactionsManager } from './transactions';
import { Currency, RecordDirection, RecordType } from '@protowallet/lookups';
import { klass, utils } from '@protowallet/common';

export type IncomeExpenseCashFlowChartData = {
  dates: Date[];
  income: Amount[];
  expense: Amount[];
};

export class AnalyticsService {
  private transactionsManager: TransactionsManager;
  // private accountsService: AccountsService;
  private transactionsAggregatorService: TransactionAggregationsService;

  constructor(
    transactionsManager: TransactionsManager,
    // accountsService: AccountsService,
    transactionsAggregatorService: TransactionAggregationsService,
  ) {
    this.transactionsManager = transactionsManager;
    // this.accountsService = accountsService;
    this.transactionsAggregatorService = transactionsAggregatorService;
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
      income: allDates.map((date) => incomeData.get(date) || { value: 0, currency: Currency.INR, direction: RecordDirection.Right }),
      expense: allDates.map((date) => expenseData.get(date) || { value: 0, currency: Currency.INR, direction: RecordDirection.Right })
    };
  }

  
}
