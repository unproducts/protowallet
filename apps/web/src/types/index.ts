import { Dispatch, SetStateAction } from 'react';
import { lookups } from '@wallet/core';
import { MultiValue, SingleValue } from 'react-select';

export type Budget = lookups.Budget;
export type ComputedBudget = lookups.ComputedBudget;
export type Category = lookups.Category;
export type Label = lookups.Label;
export type RecurringTransaction = lookups.RecurringTransaction;
export type Transaction = lookups.Transaction;
export type Account = lookups.Account;
export type CalculatedAccount = lookups.CalculatedAccount;

export type Range<T> = lookups.Range<T>;
export type RecurringBudget = lookups.RecurringBudget;

// UI Specific
export type SingleValueType = SingleValue<{ value: string; label: string }>;
export type MultiValueType = MultiValue<{ value: string; label: string }>;
export type SetStateActionType<T> = Dispatch<SetStateAction<T>>;
export type FormProps<T> = {
  resourceDetails?: T;
  setResourceDetails?: SetStateActionType<T>;
  setOpenModal: SetStateActionType<boolean>;
};
export type ResourceName = 'account' | 'label';
