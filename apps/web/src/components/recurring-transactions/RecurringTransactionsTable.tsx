import React, { useState, useEffect } from 'react';

import { Account, Category, Label, RecurringTransaction } from '@protowallet/types';

import RecurringTransactionTableItem from './RecurringTransactionTableItem';
import { UpdateRecurringTransactionOptions } from '@protowallet/core/dist/repositories';

export type RecurringTransactionsTableProps = {
  allItems: RecurringTransaction[];
  selectedItems: RecurringTransaction[];
  setSelectedItems: (items: RecurringTransaction[]) => void;
  deleteFn: (rtx: RecurringTransaction) => void;
  updateFn: (options: UpdateRecurringTransactionOptions) => void;

  accounts: Account[];
  categories: Category[];
  labels: Label[];
};

function RecurringTransactionsTable(props: RecurringTransactionsTableProps) {
  return (
    <div className="bg-white">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          {/* Table header */}
          <thead className="text-xs font-semibold uppercase text-slate-500 border-t border-b border-slate-200">
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
                  deleteFn={props.deleteFn}
                  updateFn={props.updateFn}
                  accounts={props.accounts}
                  categories={props.categories}
                  labels={props.labels}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecurringTransactionsTable;
