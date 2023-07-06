import { GeneralTimestamedEntity, IdEntity } from './base';

export type Account = {
  name: string;
  index: number;
  accent: string;
  initialBalance: number;
} & GeneralTimestamedEntity & IdEntity;

export type CalculatedAccount = Omit<Account, 'intialBalance'> & {
  balance: number;
};
