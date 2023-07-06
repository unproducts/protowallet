import React, { useEffect, useState } from 'react';
import { CalculatedAccount } from '../../types';
import PageTitle from '../shared/PageTitle';
import AccountCard from './AccountCard';

function Accounts() {
  const createdDate1 = new Date();
  createdDate1.setDate(createdDate1.getDate() - 1);
  const createdDate2 = new Date();
  createdDate2.setDate(createdDate2.getDate() - 12);
  const [accountsData, setAccountsData] = useState<CalculatedAccount[]>([
    { id: 'aklf', name: 'Bank Of India', balance: 100000, createdAt: createdDate1, index: 0, accent: 'blue', initialBalance: 100000 },
    { id: 'akldf', name: 'Cash', balance: 10002, createdAt: createdDate2, index: 0, accent: 'blue', initialBalance: 10000 },
  ]);

  useEffect(() => {
    // fetching all the account details
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
      {/* Page header */}
      <PageTitle title='Accounts' resourceName='account' />
      <div className="grid grid-cols-12 gap-2">
        {/* Card 1 */}
        {accountsData.map((account) => (
          <div className='col-span-3 p-1'>
            <AccountCard account={account} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accounts;
