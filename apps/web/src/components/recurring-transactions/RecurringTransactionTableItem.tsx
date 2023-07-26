import React from 'react';

import { Account, Category, Label, RecurringTransaction } from '@protowallet/types';
import { formatAmount } from '../../utils/Utils';
import { RecordDirection } from '@protowallet/lookups';
import DeleteIcon from '../../icons/DeleteIcon';
import { AccountRepository, CategoryRepository, UpdateRecurringTransactionOptions } from '@protowallet/core/dist/repositories';
import NewUpdateRecurringTransactionAction from './NewUpdateRecurringTransactionAction';
import EditIcon from '../../icons/EditIcon';
import { useProto } from '../../hooks/use-proto';
import CategoryIcon from '../categories/CategoryIcon';
import { EntitiesEnum } from '@protowallet/core';

export type RecurringTransactionTableItemProps = {
  recurringTransaction: RecurringTransaction;
  deleteFn: (rtx: RecurringTransaction) => void;
  updateFn: (options: UpdateRecurringTransactionOptions) => void;

  accounts: Account[];
  categories: Category[];
  labels: Label[];
};

function RecurringTransactionTableItem(props: RecurringTransactionTableItemProps) {
  const proto = useProto();
  const categoryRep = proto.getRepository(EntitiesEnum.Category) as CategoryRepository;
  const accountRep  = proto.getRepository(EntitiesEnum.Account) as AccountRepository;

  const getCategoryLogoId = (rtx: RecurringTransaction) => {
    const category = categoryRep.get(rtx.category) as Category;
    const parentCategory = categoryRep.get(category.parent);
    return (parentCategory ? parentCategory.logoId : category.logoId) as number;
  };

  const getAccountName = (rtx: RecurringTransaction) => {
    const account = accountRep.get(rtx.accountId) as Account;
    return account.name;
  }

  const getAccountAccent = (rtx: RecurringTransaction) => {
    const account = accountRep.get(rtx.accountId) as Account;
    return account.accent;
  }


  const transaction = props.recurringTransaction;
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="font-medium">
          <CategoryIcon className='w-8 h-8' logoId={getCategoryLogoId(transaction)} />
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium">{transaction.title}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`font-medium text-accent-${getAccountAccent(transaction)}-300 border rounded-sm flex items-center justify-center w-2/3 border-accent-${getAccountAccent(transaction)}-300 bg-accent-${getAccountAccent(transaction)}-100`}>{getAccountName(transaction)}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`font-medium ${transaction.amount.direction == RecordDirection.Right ? 'text-green' : 'text-red'}`}>
          {formatAmount(transaction.amount.value, transaction.amount.currency)}
        </div>
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
