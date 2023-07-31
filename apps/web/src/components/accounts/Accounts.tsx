import React, { useEffect, useState } from 'react';
import AccountCard from './AccountCard';
import SinglePageHeader from '../shared/SinglePageHeader';
import { CalculatedAccount } from '@protowallet/types';
import { useProto } from '../../hooks/use-proto';
import { AccountRepository, CreateAccountOptions, UpdateAccountOptions } from '@protowallet/core/dist/repositories';
import { EntitiesEnum } from '@protowallet/core';
import { Currency } from '@protowallet/lookups';
import { NewAccountButton } from './NewUpdateAccountAction';

function Accounts() {
  const proto = useProto();
  const prefs = proto.getPrefsProviderService();
  const accountsRepository = proto.getRepository(EntitiesEnum.Account) as AccountRepository;
  const accountsService = proto.getAccountsService();

  const [accounts, setAccounts] = useState<CalculatedAccount[]>([]);

  const createAccount = (options: CreateAccountOptions) => {
    accountsRepository.create(options).then((account) => {
      accountsService.getComputedAccount(account.id).then((calculatedAccount) => {
        setAccounts([...accounts, calculatedAccount]);
      });
    });
  };

  const updateAccount = (options: UpdateAccountOptions) => {
    accountsRepository.update(options).then((account) => {
      accountsService.getComputedAccount(account.id).then((calculatedAccount) => {
        const newAccountList = [...accounts.filter((a) => a.id !== account.id), calculatedAccount];
        newAccountList.sort((a, b) => a.index - b.index);
        setAccounts(newAccountList);
      });
    });
  };

  const deleteAccount = (id: number) => {
    accountsRepository.delete(id).then(() => {
      setAccounts([...accounts.filter((a) => a.id !== id)]);
    });
  };

  useEffect(() => {
    accountsService.getAllComputedAccounts().then((accounts) => {
      setAccounts(accounts);
    });
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
      <SinglePageHeader title="Accounts" cta={<NewAccountButton createAccountFn={createAccount}/>}/>
      <div className="grid grid-cols-12 gap-2">
        {accounts.map((account) => (
          <div className="col-span-3 p-1" key={account.id}>
            {/* TODO: Get currency from prefs. */}
            <AccountCard account={account} currency={prefs.getPreferredCurrency()} updateAccountFn={updateAccount} deleteAccountFn={deleteAccount} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accounts;
