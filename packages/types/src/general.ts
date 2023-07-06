import { Currency, RecordDirection } from '@protowallet/lookups';

export type Amount = {
  direction: RecordDirection;
  value: number;
  currency: Currency;
};

export type StrictRange<T> = {
  from: T;
  to: T;
};

export type GeneralRange<T> = Partial<StrictRange<T>>;