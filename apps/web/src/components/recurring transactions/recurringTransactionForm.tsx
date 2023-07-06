import React, { useState } from 'react';
import DatepickerSingle from '../shared/DatepickerSingle';
import Select from 'react-select';
import { recordTypes, endRecurrenceBy } from '../../constants';
import { Cron } from 'react-js-cron';
import 'react-js-cron/dist/styles.css';
import { SingleValueType } from '../../types';

export default function NewRecurringTransactionForm() {
  const [accountOptions, setAccountOptions] = useState([
    {
      value: 'test-label',
      label: 'Current Account',
    },
  ]);
  const [amount, setAmount] = useState<string>();
  const [account, setAccount] = useState([]);
  const [category, setCategory] = useState<SingleValueType>();
  const [label, setLabel] = useState('');
  const [recordType, setRecordType] = useState('');
  const [startDate, setStartDate] = useState();
  const [repeat, setRepeat] = useState(true);
  const [recursionEndType, setRecursionEndType] = useState<SingleValueType>({ value: 'count', label: 'count' });
  const [count, setCount] = useState();
  const [endDate, setEndDate] = useState();
  const [cronExpr, setCronExpr] = useState<string>('');

  const recordTypesOptions = recordTypes.map((recordType) => ({ value: recordType, label: recordType }));
  const recurringTypeOptions = endRecurrenceBy.map((recurringType) => ({ value: recurringType, label: recurringType }));

  return (
    <div className="px-5 py-4">
      <div className="text-sm">
        <div className="font-medium text-slate-800 mb-3">Testing</div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Amount <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            className="form-input w-full px-2 py-1"
            type="number"
            value={amount}
            required
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Account <span className="text-rose-500">*</span>
          </label>
          <Select options={accountOptions} isMulti />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Category <span className="text-rose-500">*</span>
          </label>
          <Select options={accountOptions} isMulti />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Label <span className="text-rose-500">*</span>
          </label>
          <Select options={accountOptions} isMulti />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Record Type <span className="text-rose-500">*</span>
          </label>
          <Select options={recordTypesOptions} isMulti />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Start Date <span className="text-rose-500">*</span>
          </label>
          <DatepickerSingle align={'middle'} setSelectedDate={setStartDate} />
        </div>
        {/* Start */}
        <div>
          <div className="text-sm text-slate-800 font-semibold mb-3">Repeat</div>
          <div className="flex items-center">
            <div className="form-switch">
              <input type="checkbox" id="company-toggle" className="sr-only" checked={repeat} onChange={() => setRepeat(!repeat)} />
              <label className="bg-slate-400" htmlFor="company-toggle">
                <span className="bg-white shadow-sm" aria-hidden="true"></span>
                <span className="sr-only"></span>
              </label>
            </div>
            <div className="text-sm text-slate-400 italic ml-2">{repeat ? 'On' : 'Off'}</div>
          </div>
          <div className="text-sm italic mt-3">Do you wish to have this as a recurring transaction ?</div>
        </div>
        {/* End */}
        {repeat ? (
          <div>
            <Cron value={cronExpr} setValue={setCronExpr} />
            Repeat Until
            {recursionEndType?.value === 'count' && <input type="number" />}
            {recursionEndType?.value === 'date' && <DatepickerSingle align={'middle'} setSelectedDate={setEndDate} />}
            <Select
              options={recurringTypeOptions}
              defaultValue={recursionEndType}
              onChange={(selectedOptions) => setRecursionEndType(selectedOptions)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
