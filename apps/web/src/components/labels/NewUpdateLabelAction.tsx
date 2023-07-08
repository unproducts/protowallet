import React, { ReactNode, useState } from 'react';

import ModalBasic from '../shared/ModalBasic';
import { utils } from '@protowallet/common';
import LabelForm, { LabelFormProps } from './LabelForm';

export type NewUpdateLabelActionProps = {
  children: ReactNode;
} & Omit<LabelFormProps, 'actionCompleteFn'>;

export const NewLabelButton = (props: Omit<NewUpdateLabelActionProps, 'children'>) => {
  return (
    <NewUpdateLabelAction {...props}>
      <span className="btn bg-primary-500 hover:bg-primary-600 text-white">
        <svg className="w-4 h-4 fill-current opacity-50 shrink-0 mr-2" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        New Label
      </span>
    </NewUpdateLabelAction>
  );
};

const NewUpdateLabelAction = (props: NewUpdateLabelActionProps) => {
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const actionCompleteFn = (_: any) => {
    setModelOpen(false);
  }
  return (
    <>
      <ModalBasic id={utils.generateRandomId()} title={'New Label'} modalOpen={modelOpen} setModalOpen={setModelOpen}>
        <LabelForm {...props} actionCompleteFn={actionCompleteFn} />
      </ModalBasic>
      <button
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

export default NewUpdateLabelAction;
