import { Currency, RecordDirection } from '@protowallet/lookups';
import { IdEntity } from './base';

export type Amount = {
  direction: RecordDirection;
  value: number;
  currency: Currency;
};

export type StrictRange<T> = {
  from: T;
  to: T;
};

export type ApplicationMode = 'desktop' | 'docker' | 'web';

export type GeneralRange<T> = Partial<StrictRange<T>>;

export type GeneralDocument = {
  data: Record<string, any> | string;
} & IdEntity;