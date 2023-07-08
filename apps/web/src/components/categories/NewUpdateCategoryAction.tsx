import React, { ReactNode, useState } from 'react';

import ModalBasic from '../shared/ModalBasic';
import { utils } from '@protowallet/common';
import CategoryForm, { CategoryFormProps } from './CategoryForm';

export type NewUpdateCategoryActionProps = {
  children: ReactNode;
  buttonClassName?: string;
} & Omit<CategoryFormProps, 'actionCompleteFn'>;

const NewUpdateCategoryAction = (props: NewUpdateCategoryActionProps) => {
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const actionCompleteFn = (_: any) => {
    setModelOpen(false);
  };
  return (
    <>
      <ModalBasic id={utils.generateRandomId()} title={'New Category'} modalOpen={modelOpen} setModalOpen={setModelOpen}>
        <CategoryForm {...props} actionCompleteFn={actionCompleteFn} />
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

export default NewUpdateCategoryAction;
