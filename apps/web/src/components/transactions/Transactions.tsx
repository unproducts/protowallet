import React, { useEffect, useState } from 'react';

import TransactionsTable from './TransactionTable';
import TransactionsFilterBar from './TransactionFilters';
import NewTransaction from './TransactionModal';
import { accounts, lookups, transactions, labels, enums, categories } from '@wallet/core';

function Transactions() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [txs, setTxs] = useState<lookups.Transaction[]>([]);

  // @ts-ignore
  const [query, setQuery] = useState<transactions.GetAllTransactionsOptions>({});

  const [accnts, setAccnts] = useState<lookups.Account[]>([]);
  const [lbls, setLbls] = useState<lookups.Label[]>([]);
  const [ctgrs, setCtgrs] = useState<lookups.Category[]>([]);
  const [transactions, setTransactions] = useState<any>([]);

  // useEffect(() => {
  //   accounts.getAllAccounts().then(setAccnts);
  //   labels.getAllLabels_Flat().then(setLbls);
  //   categories.getAllCategories().then(setCtgrs);
  // }, [])


  // useEffect(() => {
  //   if (query && query.dateRange) {
  //     transactions.getAllTransactions(query).then(setTxs);
  //   } else {
  //     setTxs([]);
  //   }
  // }, [query]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Transactions ✨</h1>
        </div>

        {/* New Transaction button */}
        <NewTransaction />
      </div>

      {/* Page content */}
      <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">
        {/* Sidebar */}
        <TransactionsFilterBar setFilterQuery={setQuery} accounts={accnts} categories={ctgrs} labels={lbls} />

        {/* Content */}
        <div className="w-full">
          {/* Search form */}
          <div className="mb-5">
            <form className="relative">
              <label htmlFor="job-search" className="sr-only">
                Search
              </label>
              <input
                id="job-search"
                className="form-input w-full pl-9 focus:border-slate-300"
                type="search"
                placeholder="Search among transactions…"
              />
              <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                <svg
                  className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Jobs header */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-slate-500 italic">Showing {txs.length} Transactions</div>
          </div>

          <TransactionsTable setTransactions={setTransactions} />
        </div>
      </div>
    </div>
  );
}

export default Transactions;
