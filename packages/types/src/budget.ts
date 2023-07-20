import { Amount, StrictRange } from './general';
import { GeneralTimestamedEntity, IdEntity, RecurringEntity } from './base';

export type Budget = {
  title: string;
  categories: number[];
  labels: number[];
  amount: Amount;
  note?: string;
  isRecurring: boolean;
} & StrictRange<Date> & IdEntity & GeneralTimestamedEntity;

export type CalculatedBudget = Budget & {
  spent: number;
};

export type RecurringBudget = Budget & RecurringEntity;