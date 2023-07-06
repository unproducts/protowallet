import React from 'react';
import { CalculatedAccount } from '../../types';
import AccountIcon from '../../icons/AccountIcon';
import { formatAmount, formatDate } from '../../utils/Utils';

export type AccountCardProps = {
  account: CalculatedAccount;
};

const AccountCard = ({ account }: AccountCardProps) => {
  return (
    <div className="border border-accent-1-300 bg-accent-1-100 rounded-md p-4 text-accent-1-300">
      <div className="flex items-center justify-between h5 font-bold">
        <span className='flex items-center'>
          <AccountIcon className="w-5 h-5 mr-1" />
          {account.name}
        </span>
      </div>
      <div className="h1">
        {formatAmount(account.balance, 'USD')}
      </div>
    </div>
  );
};

export default AccountCard;
