import React, { useState, useEffect } from 'react';
import { useProto } from '../../hooks/use-proto';
import RecurringTransactionsTable from './RecurringTransactionsTable';
import { RecurringTransaction } from '@protowallet/types';
import {
  AccountRepository,
  CategoryRepository,
  CreateRecurringTransactionOptions,
  LabelRepository,
  RecurringTransactionRepository,
  UpdateRecurringTransactionOptions,
} from '@protowallet/core/dist/repositories';
import { EntitiesEnum } from '@protowallet/core';
import SinglePageHeader from '../shared/SinglePageHeader';
import { NewRecurringTransactionButton } from './NewUpdateRecurringTransactionAction';

function RecurringTransactions() {
  const proto = useProto();

  // Get repositories
  const recurringTransactionRepository = proto.getRepository(EntitiesEnum.RecurringTransaction) as RecurringTransactionRepository;
  const accountRepo = proto.getRepository(EntitiesEnum.Account) as AccountRepository;
  const categoryRepo = proto.getRepository(EntitiesEnum.Category) as CategoryRepository;
  const labelRepo = proto.getRepository(EntitiesEnum.Label) as LabelRepository;

  // initialize data
  const allAccounts = accountRepo.getAll();
  const allCategories = categoryRepo.getAll();
  const allLabels = labelRepo.getAll();

  const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransaction[]>([]);
  const [selectedRecurringTransactions, setSelectedRecurringTransactions] = useState<RecurringTransaction[]>([]);

  useEffect(() => {
    setRecurringTransactions(recurringTransactionRepository.getAll());
  }, []);

  const removeFn = (recurringTransaction: RecurringTransaction) => {
    recurringTransactionRepository.delete(recurringTransaction.id).then(() => {
      setRecurringTransactions(recurringTransactions.filter((rt) => rt.id !== recurringTransaction.id));
    });
  };

  const createFn = (options: CreateRecurringTransactionOptions) => {
    recurringTransactionRepository.create(options).then((recurringTransaction) => {
      setRecurringTransactions([...recurringTransactions, recurringTransaction]);
    });
  };

  const updateFn = (options: UpdateRecurringTransactionOptions) => {
    recurringTransactionRepository.update(options).then((recurringTransaction) => {
      setRecurringTransactions(
        recurringTransactions.map((rt) => {
          if (rt.id === recurringTransaction.id) {
            return recurringTransaction;
          }
          return rt;
        }),
      );
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <SinglePageHeader
        title="Recurring Transactions"
        cta={<NewRecurringTransactionButton createFn={createFn} accounts={allAccounts} categories={allCategories} labels={allLabels} />}
      />
      <div className="space-y-2">
        <RecurringTransactionsTable
          allItems={recurringTransactions}
          selectedItems={selectedRecurringTransactions}
          setSelectedItems={setSelectedRecurringTransactions}
          deleteFn={removeFn}
          updateFn={updateFn}
          accounts={allAccounts}
          categories={allCategories}
          labels={allLabels}
        />
      </div>
    </div>
  );
}

export default RecurringTransactions;
