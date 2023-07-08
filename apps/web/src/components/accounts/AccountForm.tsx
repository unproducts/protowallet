import React, { useState } from 'react';
import PalletPicker from '../shared/PalletPicker';
import { CreateAccountOptions, UpdateAccountOptions } from '@protowallet/core/dist/repositories';
import { OkCancelAction } from '../../constants/enums';
import { Currency, RecordDirection } from '@protowallet/lookups';
import { Account } from '@protowallet/types';

export type AccountFormProps = {
  account?: Account;
  createAccountFn?: (account: CreateAccountOptions) => void;
  updateAccountFn?: (account: UpdateAccountOptions) => void;
  actionCompleteFn?: (actionPerformed: OkCancelAction, account?: Account) => void;
};

export default function AccountForm(props: AccountFormProps) {
  const { account, createAccountFn, updateAccountFn, actionCompleteFn } = props;

  const isUpdating = !!account && !!account.id;

  const [title, setTitle] = useState<string>(account?.name || '');
  const [initialBalance, setInitialBalance] = useState<number>(account?.initialBalance.value || 0);
  const [accent, setAccent] = useState<number>(account?.accent || 1);

  const saveAccount = () => {
    if (isUpdating) {
      updateAccountFn &&
        updateAccountFn({
          id: account!.id,
          name: title,
          accent,
        });
    } else {
      createAccountFn &&
        createAccountFn({
          name: title,
          accent,
          initialBalance: {
            value: initialBalance,
            currency: Currency.USD,
            direction: RecordDirection.Right,
          },
        });
    }
    actionCompleteFn && actionCompleteFn(OkCancelAction.Ok);
  };

  return (
    <div className="px-5 py-4">
      <div className="space-y-3">
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Title <span className="text-rose-500">*</span>
        </label>
        <input
          id="name"
          className="form-input w-full px-2 py-1"
          type="text"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {!isUpdating && (
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Initial Amount <span className="text-rose-500">*</span>
          </label>
        )}
        {!isUpdating && (
          <input
            id="amount"
            className="form-input w-full px-2 py-1"
            type="number"
            required
            value={initialBalance}
            onChange={(e) => {
              setInitialBalance(parseFloat(e.target.value));
            }}
          />
        )}
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Accent <span className="text-rose-500">*</span>
        </label>
        <PalletPicker setPalletNumber={setAccent} />
        <div className="flex flex-wrap justify-end space-x-2">
          {props.actionCompleteFn && (
            <button
              className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={() => props.actionCompleteFn && props.actionCompleteFn(OkCancelAction.Cancel)}
            >
              Cancel
            </button>
          )}
          <button className="btn-sm bg-primary-500 hover:bg-primary-600 text-white" onClick={saveAccount}>
            {isUpdating ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}
