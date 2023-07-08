import { Currency, RecordDirection } from '@protowallet/lookups';
import { Account } from '@protowallet/types';

const generatePrefilledAccounts = (currency: Currency): Account[] => {
  return [
    {
      id: 1,
      name: 'Cash',
      initialBalance: {
        direction: RecordDirection.Right,
        value: 0,
        currency: currency,
      },
      index: 0,
      accent: 1,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Bank',
      initialBalance: {
        direction: RecordDirection.Right,
        value: 0,
        currency: currency,
      },
      index: 1,
      accent: 2,
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'Credit Card',
      initialBalance: {
        direction: RecordDirection.Right,
        value: 0,
        currency: currency,
      },
      index: 2,
      accent: 3,
      createdAt: new Date(),
    },
  ];
};

export default generatePrefilledAccounts;
