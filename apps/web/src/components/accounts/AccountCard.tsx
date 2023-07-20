import React from 'react';
import AccountIcon from '../../icons/AccountIcon';
import { formatAmount } from '../../utils/Utils';
import { FindTransactionsOptions, UpdateAccountOptions } from '@protowallet/core/dist/repositories';
import { CalculatedAccount } from '@protowallet/types';
import { Currency, RecordDirection } from '@protowallet/lookups';
import EditIcon from '../../icons/EditIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import NewUpdateAccountAction from './NewUpdateAccountAction';
import TransactionsStandaloneBlotterAction from '../transactions/TransactionsStandaloneBlotterAction';
import { config } from '@protowallet/common';
import TransactionIcon from '../../icons/TransactionIcon';

export type AccountCardProps = {
  account: CalculatedAccount;
  currency: Currency;
  updateAccountFn: (options: UpdateAccountOptions) => void;
  deleteAccountFn: (id: number) => void;
};

const AccountCard = (props: AccountCardProps) => {
  const accent = props.account.accent;

  const blotterQuery: FindTransactionsOptions = {
    dateRange: {
      from: config.DATE_OF_INCEPTION,
      to: new Date(),
    },
    accounts: [props.account.id],
  };
  
  return (
    <div className={`border border-accent-${accent}-300 bg-accent-${accent}-100 rounded-md p-2 text-accent-${accent}-300`}>
      <div className="flex items-center justify-between h5 font-bold">
        <span className="flex items-center">
          <AccountIcon className="w-5 h-5 mr-1" />
          {props.account.name}
        </span>
        <div className="flex items-center">
          <TransactionsStandaloneBlotterAction
            buttonClassName={`text-accent-${accent}-200 hover:text-accent-${accent}-300 mr-2`}
            transactionQuery={blotterQuery}
          >
            <TransactionIcon className="w-5 h-5" />
          </TransactionsStandaloneBlotterAction>
          <NewUpdateAccountAction
            buttonClassName={`text-accent-${accent}-200 hover:text-accent-${accent}-300`}
            account={props.account}
            updateAccountFn={props.updateAccountFn}
          >
            <EditIcon className="w-5 h-5" />
          </NewUpdateAccountAction>
          <button
            className={`text-accent-${accent}-200 hover:text-accent-${accent}-300 ml-2`}
            onClick={(e) => {
              e.preventDefault();
              props.deleteAccountFn(props.account.id);
            }}
          >
            <DeleteIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="text-xl font-bold">
        {props.account.balance.direction == RecordDirection.Left ? '-' : ''} {formatAmount(props.account.balance.value, props.currency)}
      </div>
    </div>
  );
};

export default AccountCard;
