import React, { useState } from 'react';

import TransactionsTable from './TransactionTable';
import TransactionsFilterBar from './TransactionFilters';
import SinglePageHeader from '../shared/SinglePageHeader';
import { Transaction } from '@protowallet/types';
import { useProto } from '../../hooks/use-proto';
import { EntitiesEnum } from '@protowallet/core';
import {
  AccountRepository,
  CategoryRepository,
  CreateTransactionOptions,
  FindTransactionsOptions,
  LabelRepository,
  TransactionRepository,
  UpdateTransactionOptions,
} from '@protowallet/core/dist/repositories';
import { NewTransactionButton, NewUpdateTransactionActionProps } from './NewUpdateTransactionAction';

function Transactions() {
  const proto = useProto();

  // Get repositories
  const transactionsRepo = proto.getRepository(EntitiesEnum.Transaction) as TransactionRepository;
  const accountRepo = proto.getRepository(EntitiesEnum.Account) as AccountRepository;
  const categoryRepo = proto.getRepository(EntitiesEnum.Category) as CategoryRepository;
  const labelRepo = proto.getRepository(EntitiesEnum.Label) as LabelRepository;

  // Get services
  const transactionsManger = proto.getTransactionsManager();

  // initialize data
  const allAccounts = accountRepo.getAll();
  const allCategories = categoryRepo.getAll();
  const allLabels = labelRepo.getAll();

  const [txs, setTxs] = useState<Transaction[]>([]);

  const applyFilter = (options: FindTransactionsOptions) => {
    transactionsManger.query(options).then(setTxs);
  };

  const createTxn = (options: CreateTransactionOptions) => {
    transactionsRepo.create(options).then((createdTx) => {
      const newTxs = [...txs, createdTx];
      newTxs.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
      setTxs(newTxs);
    });
  };

  const updateTxn = (options: UpdateTransactionOptions) => {
    transactionsRepo.update(options).then((updatedTx) => {
      setTxs(txs.map((t) => (t.id === updatedTx.id ? updatedTx : t)));
    });
  };

  const deleteTxn = (txn: Transaction) => {
    transactionsRepo.delete(txn.id).then(() => {
      setTxs(txs.filter((t) => t.id !== txn.id));
    });
  };

  const newTxnProps: Omit<NewUpdateTransactionActionProps, 'children'> = {
    accounts: allAccounts,
    categories: allCategories,
    labels: allLabels,
    createFn: createTxn,
    updateFn: updateTxn,
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
      <SinglePageHeader title="Transactions" cta={<NewTransactionButton {...newTxnProps} />} />
      <div className="flex space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-slate-500 italic">Showing {txs.length} Transactions</div>
          </div>

          <TransactionsTable
            transactions={txs}
            deleteFn={deleteTxn}
            updateFn={updateTxn}
            labels={allLabels}
            categories={allCategories}
            accounts={allAccounts}
          />
        </div>
        <TransactionsFilterBar setFilterQuery={applyFilter} accounts={allAccounts} categories={allCategories} labels={allLabels} />
      </div>
    </div>
  );
}

export default Transactions;
