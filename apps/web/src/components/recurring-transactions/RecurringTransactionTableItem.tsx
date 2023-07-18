import React from 'react';

import { Account, Category, Label, RecurringTransaction } from '@protowallet/types';
import { formatAmount } from '../../utils/Utils';
import { RecordDirection } from '@protowallet/lookups';
import DeleteIcon from '../../icons/DeleteIcon';
import { UpdateRecurringTransactionOptions } from '@protowallet/core/dist/repositories';
import NewUpdateRecurringTransactionAction from './NewUpdateRecurringTransactionAction';
import EditIcon from '../../icons/EditIcon';

export type RecurringTransactionTableItemProps = {
  recurringTransaction: RecurringTransaction;
  deleteFn: (rtx: RecurringTransaction) => void;
  updateFn: (options: UpdateRecurringTransactionOptions) => void;

  accounts: Account[];
  categories: Category[];
  labels: Label[];
};

function RecurringTransactionTableItem(props: RecurringTransactionTableItemProps) {
  const transaction = props.recurringTransaction;
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium">{transaction.title}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium">{transaction.accountId}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`font-medium ${transaction.amount.direction == RecordDirection.Right ? 'text-green' : 'text-red'}`}>
          {formatAmount(transaction.amount.value, transaction.amount.currency)}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium">{transaction.category}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium">{transaction.startDate.toDateString()}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="space-x-1">
          <NewUpdateRecurringTransactionAction
            buttonClassName={'text-slate-400 hover:text-slate-500 rounded-lg border p-2 mr-1'}
            recurringTransaction={transaction}
            accounts={props.accounts}
            categories={props.categories}
            labels={props.labels}
            updateFn={props.updateFn}
          >
            <EditIcon className="w-5 h-5" />
          </NewUpdateRecurringTransactionAction>
          <button
            className="text-red-400 hover:text-red-500 border rounded-lg p-2"
            onClick={(e) => {
              e.preventDefault();
              props.deleteFn(transaction);
            }}
          >
            <DeleteIcon className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default RecurringTransactionTableItem;
