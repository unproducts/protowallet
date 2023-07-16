import { UpdateTransactionOptions } from '@protowallet/core/dist/repositories';
import { RecordDirection, RecordType } from '@protowallet/lookups';
import { Amount, Transaction } from '@protowallet/types';
import React from 'react';
import { formatAmount, formatDate } from '../../utils/Utils';

export type TransactionsTableItemProps = {
  transaction: Transaction;
  updateFn: (options: UpdateTransactionOptions) => void;
  deleteFn: (transaction: Transaction) => void;
};

function TransactionsTableItem(props: TransactionsTableItemProps) {
  const transaction = props.transaction;

  const statusColor = (txType: RecordType) => {
    switch (txType) {
      case RecordType.Income:
        return 'bg-emerald-100 text-emerald-600';
      case RecordType.Expense:
        return 'bg-rose-100 text-rose-500';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };

  const amountColor = (amount: Amount) => {
    switch (amount.direction) {
      case RecordDirection.Right:
        return 'text-emerald-500';
      default:
        return 'text-red-500';
    }
  };

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{transaction.title}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{formatDate(transaction.createdAt)}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${statusColor(transaction.type)}`}>
          {transaction.type}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className={`text-right font-medium ${amountColor(transaction.amount)}`}>
          {formatAmount(transaction.amount.value, transaction.amount.currency)}
        </div>
      </td>
    </tr>
  );
}

export default TransactionsTableItem;
