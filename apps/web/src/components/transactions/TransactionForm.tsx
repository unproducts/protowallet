import React, { useEffect, useState } from 'react';
import DatePickerSingle from '../shared/DatepickerSingle';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { MultiValueType, SingleValueType } from '../../types';

export default function NewTransaction() {
  /* TO DO 
    [UI] update date picker view to accomadate time as well
    Refactoring
  */
  const [accountOptions, setAccountOptions] = useState([
    {
      value: 'test-label',
      label: 'Test Label',
    },
  ]);
  const [labelOptions, setLabelOptions] = useState([
    {
      value: 'test-label',
      label: 'Test Label',
    },
  ]);
  const [categoryOptions, setCategoryOptions] = useState([
    {
      value: 'test-cateogry',
      label: 'Test',
    },
  ]);

  // To load the accounts , labeld and categories options
  useEffect(() => { }, [])

  const [selectedRecordType, setSelectedRecordType] = useState<String>('Expense');
  const [selectedCategories, setSelectedCategories] = useState<SingleValueType>();
  const [selectedLabels, setSelectedLabels] = useState<MultiValueType>();
  const [amount, setAmount] = useState<string>('');
  const [selectedAccount, setSelectedAccount] = useState<SingleValueType>();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [transactionDate, setTransactionDate] = useState();

  return (
    <div className="px-5 py-4">
      <div className="text-sm">
        <div className="font-medium text-slate-800 mb-3">Testing</div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            className="form-input w-full px-2 py-1"
            type="text"
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Amount <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            className="form-input w-full px-2 py-1"
            type="email"
            required
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="feedback">
            Note <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="feedback"
            className="form-textarea w-full px-2 py-1"
            rows={4}
            required
            onChange={(e) => {
              setNote(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="m-1.5">
          {/* Start Group BUtton */}
          <div className="flex flex-wrap -space-x-px">
            <button
              className={`btn bg-slate-50 border-slate-200 hover:bg-slate-50 ${selectedRecordType === 'Expense' ? 'text-indigo-500' : 'text-slate-600'
                } rounded-none first:rounded-l last:rounded-r`}
              onClick={() => setSelectedRecordType('Expense')}
            >
              Expense
            </button>
            <button
              className={`btn bg-slate-50 border-slate-200 hover:bg-slate-50 ${selectedRecordType === 'Income' ? 'text-indigo-500' : 'text-slate-600'
                } rounded-none first:rounded-l last:rounded-r`}
              onClick={() => {
                setSelectedRecordType('Income');
              }}
            >
              Income
            </button>
            <button
              className={`btn bg-slate-50 border-slate-200 hover:bg-slate-50 ${selectedRecordType === 'Transfer' ? 'text-indigo-500' : 'text-slate-600'
                } rounded-none first:rounded-l last:rounded-r`}
              onClick={() => setSelectedRecordType('Transfer')}
            >
              Transfer
            </button>
          </div>
          {/* End */}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Account <span className="text-rose-500">*</span>
          </label>
          <Select options={accountOptions} onChange={(values) => setSelectedAccount(values)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Category <span className="text-rose-500">*</span>
          </label>
          <Select options={categoryOptions} onChange={(values) => setSelectedCategories(values)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Label <span className="text-rose-500">*</span>
          </label>
          <CreatableSelect options={labelOptions} isMulti onChange={(values) => setSelectedLabels(values)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Transaction Date <span className="text-rose-500">*</span>
          </label>
          <DatePickerSingle setSelectedDate={setTransactionDate} />
        </div>
      </div>
    </div>
  );
}
