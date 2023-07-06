import { Amount, StrictRange } from './general';
import { IdEntity, RecurringEntity } from './base';

export type Budget = {
  title: string;
  categories: number[];
  labels: string[];
  amount: Amount;
  notes?: string;
  isRecurring: boolean;
} & StrictRange<Date> & IdEntity;

export type ComputedBudget = Budget & {
  spent: number;
};

export type RecurringBudget = Budget & RecurringEntity;