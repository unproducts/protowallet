import React from 'react';
import TransactionItem from './TransactionTableItem';

import { Account, Category, Label, Transaction } from '@protowallet/types';
import { UpdateTransactionOptions } from '@protowallet/core/dist/repositories';

type TransactionTableProps = {
  transactions: Transaction[];
  deleteFn: (transaction: Transaction) => void;
  updateFn: (transaction: UpdateTransactionOptions) => void;
  labels: Label[];
  categories: Category[];
  accounts: Account[];
};

function TransactionsTable(props: TransactionTableProps) {
  const transactions = props.transactions;
  return (
    <div className="bg-white">
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 border-t border-b border-slate-200">
              <tr>
                <th />
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Title</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Date</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-right">Amount</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200 border-b border-slate-200">
              {transactions.map((transaction) => {
                return (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    deleteFn={props.deleteFn}
                    updateFn={props.updateFn}
                    labels={props.labels}
                    categories={props.categories}
                    accounts={props.accounts}
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

export default TransactionsTable;
