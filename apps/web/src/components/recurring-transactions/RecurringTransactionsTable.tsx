import React, { useState, useEffect } from 'react';

import { RecurringTransaction } from '@protowallet/types';

import RecurringTransactionTableItem from './RecurringTransactionTableItem';

export type RecurringTransactionsTableProps = {
  allItems: RecurringTransaction[];
  selectedItems: RecurringTransaction[];
  setSelectedItems: (items: RecurringTransaction[]) => void;
  deleteRtx: (rtx: RecurringTransaction) => void;
};

function RecurringTransactionsTable(props: RecurringTransactionsTableProps) {

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">
          Recurring Transactions <span className="text-slate-400 font-medium ml-2">{props.allItems.length}</span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Title</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Account</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Amount</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Category</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Start Date</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {props.allItems.map((rtx) => {
                return (
                  <RecurringTransactionTableItem
                    key={rtx.id}
                    recurringTransaction={rtx}
                    deleteRtx={props.deleteRtx}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecurringTransactionsTable;
