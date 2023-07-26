import { Currency } from '@protowallet/lookups';
import { CalculatedAccount } from '@protowallet/types';
import React from 'react';
import AccountCard from '../accounts/AccountCard';

export type AccountsStripProps = {
  accounts: CalculatedAccount[];
  currency: Currency;
};

const AccountsStrip = (props: AccountsStripProps) => {
  return (
    <div className="overflow-x-scroll">
      <div className="flex flex-nowrap items-center justify-start">
        {props.accounts.map((acc) => (
          <span key={acc.id} className='w-1/3 px-1'>
            <AccountCard account={acc} currency={props.currency} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default AccountsStrip;
