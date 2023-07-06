import { GeneralTimestamedEntity, IdEntity } from './base';
import { Amount } from './general';

export type Account = {
  name: string;
  index: number;
  accent: number;
  initialBalance: Amount;
} & GeneralTimestamedEntity & IdEntity;

export type CalculatedAccount = Omit<Account, 'intialBalance'> & {
  balance: Amount;
};
