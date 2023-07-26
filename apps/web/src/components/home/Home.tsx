import React, { useEffect, useState } from 'react';
import AccountsStrip from './AccountsStrip';
import { useProto } from '../../hooks/use-proto';
import { AccountsService } from '@protowallet/core/dist/services';
import { CalculatedAccount } from '@protowallet/types';
import { Currency } from '@protowallet/lookups';
import IncomeExpenseTimeSeriesAnalysis from '../analytics/cards/IncomeExpenseTimeSeriesAnalysis';

const HomePage = () => {
  const proto = useProto();
  const accountsService: AccountsService = proto.getAccountsService();
  const [calculatedAccounts, setCalculatedAccounts] = useState<CalculatedAccount[]>([]);

  useEffect(() => {
    accountsService.getAllComputedAccounts(4).then((accounts) => {
      setCalculatedAccounts(accounts);
    });
  }, []);

  return (
    <section className="mx-2 mt-6 w-full">
      <AccountsStrip accounts={calculatedAccounts} currency={Currency.INR} />
      <div className="w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-6">{/* Datepicker built with flatpickr */}</div>

        {/* Cards */}
        <div className="flex items-center justify-center w-full px-2">
          {/* Line chart (Analytics) */}
          <IncomeExpenseTimeSeriesAnalysis />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
