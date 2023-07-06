import { RecordType } from '@protowallet/lookups';
import { RecurringEntity } from './base';
import { Amount } from './general';

export type Transaction = {
  id: string;
  accountId: string;
  type: RecordType;
  category: number;
  amount: Amount;
  note?: string;
  labels?: string[];
  timestamp: number;

  isRecurringTransaction: boolean;
};

export type RecurringTransaction = {
  id: string;
  accountId: string;
  type: RecordType;
  category: number;
  amount: Amount;
  labels?: string[];
} & RecurringEntity;
