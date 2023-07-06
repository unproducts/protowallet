import React, { useState } from 'react';
import RecurringTransactionModal from './recurringTransactionModal';
import RecurringTransactionTable from './recurringTransactionTable';

function RecurringTransactions() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Templates ✨</h1>
        </div>

        {/* Add card button */}
        <RecurringTransactionModal />
      </div>

      {/* Categories cards */}
      <div className="space-y-2">
        <RecurringTransactionTable />
      </div>
    </div>
  );
}

export default RecurringTransactions;
