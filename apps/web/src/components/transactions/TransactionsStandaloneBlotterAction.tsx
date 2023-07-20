import React, { useState } from 'react';

import {
  AccountRepository,
  CategoryRepository,
  FindTransactionsOptions,
  LabelRepository,
  TransactionRepository,
  UpdateTransactionOptions,
} from '@protowallet/core/dist/repositories';
import { useProto } from '../../hooks/use-proto';
import { Transaction } from '@protowallet/types';
import ModalBasic from '../shared/ModalBasic';
import { utils } from '@protowallet/common';
import TransactionTable from './TransactionTable';
import { EntitiesEnum } from '@protowallet/core';

export type TransactionsStandaloneBlotterActionProps = {
  transactionQuery: FindTransactionsOptions;
  buttonClassName?: string;
  children: React.ReactNode;
};

const TransactionsStandaloneBlotterAction = (props: TransactionsStandaloneBlotterActionProps) => {
  const [modelOpen, setModelOpen] = useState<boolean>(false);

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

  const applyFilter = () => {
    transactionsManger.query(props.transactionQuery).then(setTxs);
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

  return (
    <>
      <ModalBasic id={utils.generateRandomId()} title="Transactions" modalOpen={modelOpen} setModalOpen={setModelOpen}>
        <TransactionTable
          transactions={txs}
          accounts={allAccounts}
          categories={allCategories}
          labels={allLabels}
          updateFn={updateTxn}
          deleteFn={deleteTxn}
        />
      </ModalBasic>
      <button
        className={props.buttonClassName}
        onClick={(e) => {
          e.preventDefault();
          applyFilter();
          setModelOpen(true);
        }}
      >
        {props.children}
      </button>
    </>
  );
};

export default TransactionsStandaloneBlotterAction;
