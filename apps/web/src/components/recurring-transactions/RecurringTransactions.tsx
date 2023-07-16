import React, { useState, useEffect } from 'react';
import { useProto } from '../../hooks/use-proto';
import RecurringTransactionsTable from './RecurringTransactionsTable';
import { RecurringTransaction } from '@protowallet/types';
import { RecurringTransactionRepository } from '@protowallet/core/dist/repositories';
import { EntitiesEnum } from '@protowallet/core';

function RecurringTransactions() {
  const proto = useProto();
  const recurringTransactionRepository = proto.getRepository(EntitiesEnum.RecurringTransaction) as RecurringTransactionRepository;

  const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransaction[]>([]);
  const [selectedRecurringTransactions, setSelectedRecurringTransactions] = useState<RecurringTransaction[]>([]);

  useEffect(() => {
    setRecurringTransactions(recurringTransactionRepository.getAll());
  }, []);

  const remove = (recurringTransaction: RecurringTransaction) => {
    recurringTransactionRepository.delete(recurringTransaction.id).then(() => {
      setRecurringTransactions(recurringTransactions.filter((rt) => rt.id !== recurringTransaction.id));
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="space-y-2">
        <RecurringTransactionsTable
          allItems={recurringTransactions}
          selectedItems={selectedRecurringTransactions}
          setSelectedItems={setSelectedRecurringTransactions}
          deleteRtx={remove}
        />
      </div>
    </div>
  );
}

export default RecurringTransactions;
