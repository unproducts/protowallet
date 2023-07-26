import React, { useState } from 'react';
import { ComputedBudget } from '../../types';
import BudgetCard from './BudgetCard';
import BudgetSidebar from './BudgetSidebar';
import { Currency } from '@protowallet/lookups';

// import NewAccountModal from '../../partials/wallet/NewAccountModal';

function Budgets() {
  const computedBudgets: ComputedBudget[] = [
    {
      id: 'anscs',
      title: 'Groceries',
      categories: [],
      labels: [],
      amount: 100,
      spent: 33,
      currency: Currency.INR,
      startDate: new Date(),
      endDate: new Date(),
      isRecurring: false,
    },
  ];
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-5">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Budgets ✨</h1>
          </div>

          {/* Add card button */}
          {/* <NewAccountModal /> */}
        </div>

        {/* Budget cards */}
        <div className="flex flex-col space-y-2">
          <BudgetCard budget={computedBudgets[0]} isSelected={true}/>
          <BudgetCard budget={computedBudgets[0]} isSelected={false}/>
        </div>
      </div>

      {/* Sidebar */}
      <BudgetSidebar budget={computedBudgets[0]} underlyingTransactions={[]} />
    </>
  );
}

export default Budgets;
