import React, { ReactNode, useState } from 'react';

import ModalBasic from '../shared/ModalBasic';
import { utils } from '@protowallet/common';
import TransactionForm, { TransactionFormProps } from './TransactionForm';

export type NewUpdateTransactionActionProps = {
  children: ReactNode;
  buttonClassName?: string;
} & Omit<TransactionFormProps, 'actionCompleteFn'>;

export const NewTransactionButton = (props: Omit<NewUpdateTransactionActionProps, 'children'>) => {
  return (
    <NewUpdateTransactionAction {...props}>
      <span className="btn bg-primary-500 hover:bg-primary-600 text-white">
        <svg className="w-4 h-4 fill-current opacity-50 shrink-0 mr-2" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        New Transaction
      </span>
    </NewUpdateTransactionAction>
  );
};

const NewUpdateTransactionAction = (props: NewUpdateTransactionActionProps) => {
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const actionCompleteFn = (_: any) => {
    setModelOpen(false);
  };
  return (
    <>
      <ModalBasic
        id={utils.generateRandomId()}
        title={(props.transaction ? 'Update' : 'New') + 'Transaction'}
        modalOpen={modelOpen}
        setModalOpen={setModelOpen}
      >
        <TransactionForm {...props} actionCompleteFn={actionCompleteFn} />
      </ModalBasic>
      <button
        className={props.buttonClassName}
        onClick={(e) => {
          e.preventDefault();
          setModelOpen(true);
        }}
      >
        {props.children}
      </button>
    </>
  );
};

export default NewUpdateTransactionAction;
