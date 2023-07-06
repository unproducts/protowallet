import React, { useState } from 'react';
import PalletPicker from '../shared/PalletPicker';
import { Account, FormProps } from '../../types';

// TODO: In the backend add intialBalance and change the accent type to number.
export default function AccountForm({ resourceDetails: accountDetails, setResourceDetails: setAccountDetails, setOpenModal }: FormProps<Account>) {
  const [title, setTitle] = useState<string>(accountDetails?.name || '');
  // const [initialBalance, setInitialBalance] = useState<string>(accountDetails?.initialBalance || '0');
  const [initialBalance, setInitialBalance] = useState<string>('0');
  // const [accent, setAccent] = useState<number>(accountDetails?.accent || 1);
  const [accent, setAccent] = useState<number>(1);

  const createAccount = () => {
    // post call
    setOpenModal(false);
  };

  const updateAccountDetails = () => {
    // put call
    setAccountDetails?.(prevState => ({ ...prevState, name: title, accent: accent.toString() }));
    setOpenModal(false);
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
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Initial Amount <span className="text-rose-500">*</span>
        </label>
        <input
          id="amount"
          className="form-input w-full px-2 py-1"
          type="number"
          required
          value={initialBalance}
          onChange={(e) => {
            setInitialBalance(e.target.value);
          }}
        />
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Accent <span className="text-rose-500">*</span>
        </label>
        <PalletPicker setPalletNumber={setAccent} />
        <div className="flex flex-wrap justify-end space-x-2">
          <button
            className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal(false);
            }}
          >
            Cancel
          </button>
          {
            accountDetails ? <button className="btn-sm bg-primary-500 hover:bg-primary-600 text-white" onClick={() => updateAccountDetails()}>Edit</button> :
              <button className="btn-sm bg-primary-500 hover:bg-primary-600 text-white" onClick={() => createAccount()}>Create</button>
          }

        </div>
      </div>
    </div>
  );
}
