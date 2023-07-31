import React, { useState } from 'react';
import DatePickerSingle from '../shared/DatepickerSingle';
import Select from 'react-select';
import { Account, Amount, Category, Label, RecurringTransaction, Transaction } from '@protowallet/types';
import { CreateRecurringTransactionOptions, UpdateRecurringTransactionOptions } from '@protowallet/core/dist/repositories';
import { Currency, EndRecurrenceBy, RecordDirection, RecordType } from '@protowallet/lookups';
import { OkCancelAction } from '../../constants/enums';
import { Cron } from 'react-js-cron';
import 'react-js-cron/dist/styles.css';
import { usePrefs } from '../../hooks/use-prefs';

export type RecurringTransactionFormProps = {
  recurringTransaction?: RecurringTransaction;
  updateFn?: (options: UpdateRecurringTransactionOptions) => void;
  createFn?: (options: CreateRecurringTransactionOptions) => void;

  accounts: Account[];
  labels: Label[];
  categories: Category[];

  actionCompleteFn?: (actionPerformed: OkCancelAction, transaction?: Transaction) => void;
};

function itemToSelectApi<T>(item: T, labelKey: string): SelectApi<T> {
  return {
    value: item,
    label: item[labelKey],
  };
}

export type SelectApi<T> = {
  value: T;
  label: keyof T;
};

const getAmount = (amountRaw: number, type: RecordType, currency: Currency): Amount => {
  return {
    value: Math.abs(amountRaw),
    direction: type == RecordType.Income ? RecordDirection.Right : RecordDirection.Left,
    currency,
  };
};

export default function RecurringTransactionForm(props: RecurringTransactionFormProps) {
  const prefs = usePrefs();
  console.log(prefs.getPrefs())
  // Options Data
  const accountsAvailable = props.accounts.map((acc: Account) => itemToSelectApi(acc, 'name'));
  const labelsAvailable = props.labels.map((label: Label) => itemToSelectApi(label, 'value'));
  const categoriesAvailable = props.categories.map((category: Category) => itemToSelectApi(category, 'title'));

  const isUpdating = props.recurringTransaction !== undefined;
  const recurringTransaction = props.recurringTransaction;

  // Form Bindings
  const [category, setCategory] = useState<SelectApi<Category> | null>(
    categoriesAvailable.find((ctg) => ctg.value.id == recurringTransaction?.category) || null,
  );
  const [labels, setLabels] = useState<readonly SelectApi<Label>[] | null>(
    labelsAvailable.filter((l) => recurringTransaction?.labels.includes(l.value.id)) || null,
  );
  const [account, setAccount] = useState<SelectApi<Account> | null>(
    accountsAvailable.find((acc) => acc.value.id == recurringTransaction?.accountId) || null,
  );

  const [title, setTitle] = useState(recurringTransaction?.title || '');
  const [amountRaw, setAmountRaw] = useState<number>(recurringTransaction?.amount.value || 0);
  const [recordType, setRecordType] = useState<RecordType>(recurringTransaction?.type || RecordType.Expense);
  const [startDate, setStartDate] = useState<Date[]>([recurringTransaction?.startDate || new Date()]);

  const [cronExpr, setCronExpr] = useState<string>(recurringTransaction?.cronExpr || '0 0 1 1 *');
  const [endRecurrenceBy, setEndRecurrenceBy] = useState<EndRecurrenceBy>(recurringTransaction?.endTokenType || EndRecurrenceBy.Count);
  const [endRecurrenceCount, setEndRecurrenceCount] = useState<number>(recurringTransaction?.endToken as number || 1);
  const [selectedEndDate, setSelectedEndDate] = useState<Date[]>([(recurringTransaction?.endToken as Date) || new Date()]);

  const getEndToken = () => {
    if (endRecurrenceBy == EndRecurrenceBy.Count) {
      return endRecurrenceCount;
    } else if (endRecurrenceBy == EndRecurrenceBy.EndDate) {
      return selectedEndDate[0];
    } else {
      return undefined;
    }
  };

  const saveTxn = () => {
    if (isUpdating) {
      props.updateFn &&
        props.updateFn({
          id: recurringTransaction?.id || 0,
          title,
          amount: getAmount(amountRaw, recordType, prefs.getPreferredCurrency()),
          type: recordType,
          startDate: startDate[0],
          createdAt: new Date(),
          accountId: account?.value.id || 0,
          category: category?.value.id || 0,
          labels: labels?.map((l) => l.value.id) || [],
          endTokenType: endRecurrenceBy,
          endToken: getEndToken(),
          cronExpr,
        });
    } else {
      props.createFn &&
        props.createFn({
          title,
          amount: getAmount(amountRaw, recordType, prefs.getPreferredCurrency()),
          type: recordType,
          startDate: startDate[0],
          createdAt: new Date(),
          accountId: account?.value.id || 0,
          category: category?.value.id || 0,
          labels: labels?.map((l) => l.value.id) || [],
          endTokenType: endRecurrenceBy,
          endToken: getEndToken(),
          cronExpr,
        });
    }
    props.actionCompleteFn && props.actionCompleteFn(OkCancelAction.Ok);
  };

  return (
    <div className="px-5 py-4">
      <form className="space-y-3" onSubmit={saveTxn}>
        {/* Start Group BUtton */}
        <div className="flex flex-wrap justify-center items-center -space-x-px">
          <button
            className={`btn border-slate-200 hover text-slate-600 rounded-none first:rounded-l last:rounded-r ${
              recordType == RecordType.Expense && 'bg-red-500 text-white'
            } `}
            onClick={(e) => {
              e.preventDefault();
              setRecordType(RecordType.Expense);
            }}
          >
            Expense
          </button>
          <button
            className={`btn border-slate-200 hover text-slate-600 rounded-none first:rounded-l last:rounded-r ${
              recordType == RecordType.Income && 'bg-green-500 text-white'
            } `}
            onClick={(e) => {
              e.preventDefault();
              setRecordType(RecordType.Income);
            }}
          >
            Income
          </button>
        </div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Title <span className="text-rose-500">*</span>
        </label>
        <input
          id="title"
          className="form-input w-full px-2 py-1"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="block text-sm font-medium mb-1" htmlFor="amountRaw">
          Amount <span className="text-rose-500">*</span>
        </label>
        <input
          id="amountRaw"
          className="form-input w-full px-2 py-1"
          type="number"
          value={amountRaw}
          onChange={(e) => {
            setAmountRaw(parseInt(e.target.value));
          }}
        />
        <label className="block text-sm font-medium mb-1">
          Start Date <span className="text-rose-500">*</span>
        </label>
        <DatePickerSingle setSelectedDate={setStartDate} />
        <label className="block text-sm font-medium mb-1">
          Account <span className="text-rose-500">*</span>
        </label>
        <Select options={accountsAvailable} value={account} onChange={setAccount} />
        <label className="block text-sm font-medium mb-1">
          Category <span className="text-rose-500">*</span>
        </label>
        <Select options={categoriesAvailable} value={category} onChange={setCategory} />
        <label className="block text-sm font-medium mb-1">
          Label <span className="text-rose-500">*</span>
        </label>
        <Select options={labelsAvailable} value={labels} isMulti onChange={setLabels} />
        <label className="block text-sm font-medium mb-1">
          How do you want this repeated transaction to end? <span className="text-rose-500">*</span>
        </label>
        <label className="block text-sm font-medium mb-1">
          Set Repeating Rule <span className="text-rose-500">*</span>
        </label>
        <Cron value={cronExpr} setValue={setCronExpr} />
        <div className="flex flex-wrap justify-center items-center -space-x-px">
          <button
            className={`btn border-slate-200 hover text-slate-600 rounded-none first:rounded-l last:rounded-r ${
              endRecurrenceBy == EndRecurrenceBy.Count && 'bg-primary-500 text-white'
            } `}
            onClick={(e) => {
              e.preventDefault();
              setEndRecurrenceBy(EndRecurrenceBy.Count);
            }}
          >
            By Count
          </button>
          <button
            className={`btn border-slate-200 hover text-slate-600 rounded-none first:rounded-l last:rounded-r ${
              endRecurrenceBy == EndRecurrenceBy.EndDate && 'bg-primary-500 text-white'
            } `}
            onClick={(e) => {
              e.preventDefault();
              setEndRecurrenceBy(EndRecurrenceBy.EndDate);
            }}
          >
            At Some Date
          </button>
          <button
            className={`btn border-slate-200 hover text-slate-600 rounded-none first:rounded-l last:rounded-r ${
              endRecurrenceBy == EndRecurrenceBy.NeverEnd && 'bg-primary-500 text-white'
            } `}
            onClick={(e) => {
              e.preventDefault();
              setEndRecurrenceBy(EndRecurrenceBy.NeverEnd);
            }}
          >
            Never End
          </button>
        </div>
        {endRecurrenceBy == EndRecurrenceBy.Count && (
          <>
            <label className="block text-sm font-medium mb-1" htmlFor="countRaw">
              After how many occurences? <span className="text-rose-500">*</span>
            </label>
            <input
              id="countRaw"
              className="form-input w-full px-2 py-1"
              type="number"
              value={endRecurrenceCount}
              onChange={(e) => {
                setEndRecurrenceCount(parseInt(e.target.value));
              }}
            />
          </>
        )}
        {endRecurrenceBy == EndRecurrenceBy.EndDate && (
          <>
            <label className="block text-sm font-medium mb-1">
              End on which date? <span className="text-rose-500">*</span>
            </label>
            <DatePickerSingle setSelectedDate={setSelectedEndDate} />
          </>
        )}

        <div className="flex flex-wrap justify-end space-x-2">
          {props.actionCompleteFn && (
            <button
              className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={(e) => {
                e.preventDefault();
                props.actionCompleteFn && props.actionCompleteFn(OkCancelAction.Cancel);
              }}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn-sm bg-primary-500 hover:bg-primary-600 text-white"
            onClick={(e) => {
              e.preventDefault();
              saveTxn();
            }}
          >
            {isUpdating ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
