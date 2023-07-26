import React, { useEffect, useState } from 'react';
import LineChart from '../charts/LineChart03';

import { useProto } from '../../../hooks/use-proto';
import DateSelect from '../../shared/DateSelect';
import Datepicker from '../../shared/Datepicker';
import createChartData from './create-chart-data';
import { IncomeExpenseCashFlowChartData } from '@protowallet/core/dist/services/analytics';
import { formatAmount } from '../../../utils/Utils';
import { Currency } from '@protowallet/lookups';

const preProcessData = (data: IncomeExpenseCashFlowChartData): IncomeExpenseCashFlowChartProcessedData => {
  return {
    dates: data.dates,
    income: data.income.map((val) => val.value),
    expense: data.expense.map((val) => val.value),
  };
};

export type IncomeExpenseCashFlowChartProcessedData = {
  dates: Date[];
  income: number[];
  expense: number[];
};

function IncomeExpenseTimeSeriesAnalysis() {
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() - 1);

  const [dateSelectedType, setDateSelectedType] = useState('Last Month');
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(defaultDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());

  const [chartData, setChartData] = useState<IncomeExpenseCashFlowChartProcessedData>({ dates: [], income: [], expense: [] });

  const [netIncome, setNetIncome] = useState(0);
  const [netExpense, setNetExpense] = useState(0);

  const proto = useProto();
  const analyticsService = proto.getAnalyticsService();

  useEffect(() => {
    switch (dateSelectedType) {
      case 'Today':
        setSelectedStartDate(new Date());
        setSelectedEndDate(new Date());
        break;
      case 'Last 7 Days':
        setSelectedStartDate(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000));
        setSelectedEndDate(new Date());
        break;
      case 'Last Month':
        setSelectedStartDate(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000));
        setSelectedEndDate(new Date());
        break;
      case 'Last 12 Months':
        setSelectedStartDate(new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000));
        setSelectedEndDate(new Date());
        break;
    }
  }, [dateSelectedType]);

  useEffect(() => {
    analyticsService
      .getIncomeExpenseCashFlowChartData({
        from: selectedStartDate,
        to: selectedEndDate,
      })
      .then((data) => {
        setChartData(preProcessData(data));
        setNetIncome(data.income.reduce((acc, val) => acc + val.value, 0));
        setNetExpense(data.expense.reduce((acc, val) => acc + val.value, 0));
      });
  }, [selectedStartDate, selectedEndDate]);

  return (
    <div className="flex flex-col col-span-full xl:col-span-8  rounded-lg border border-primary-500">
      <header className="px-2 py-2 border-b border-slate-100 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">Cashflows</h2>
        <div className="flex space-x-2 items-center justify-end w-full">
          {/* <div className="text-sm text-slate-800 font-medium">Date</div> */}
          <DateSelect onChange={setDateSelectedType} initialSelected={2}></DateSelect>
          {dateSelectedType === 'Custom' ? (
            <div>
              {/* <div className="text-sm text-slate-800 font-medium">Custom Date</div> */}
              <Datepicker align="center" setSelectedStartDate={setSelectedStartDate} setSelectedEndDate={setSelectedEndDate}></Datepicker>
            </div>
          ) : null}
        </div>
      </header>
      <div className="px-5 py-1">
        <div className="flex flex-wrap justify-center">
          {/* Total Spendings */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-red-500 mr-2">{formatAmount(netExpense, Currency.INR)}</div>
              </div>
              <div className="text-sm text-slate-500">Total Spendings</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-200 mr-5" aria-hidden="true"></div>
          </div>
          {/* Total Income */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-green-500 mr-2">{formatAmount(netIncome, Currency.INR)}</div>
              </div>
              <div className="text-sm text-slate-500">Total Income</div>
            </div>
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={createChartData(chartData)} width={1200} height={300} />
      </div>
    </div>
  );
}

export default IncomeExpenseTimeSeriesAnalysis;
