import loki from 'lokijs';

import { Account, Transaction, Label, RecurringTransaction, Category, Budget, RecurringBudget, GeneralDocument } from '@protowallet/types';

export type ApplicationFeed = {
  accounts: Collection<Account>;
  transactions: Collection<Transaction>;
  labels: Collection<Label>;
  recurringTransactions: Collection<RecurringTransaction>;
  categories: Collection<Category>;
  budgets: Collection<Budget>;
  recurringBudgets: Collection<RecurringBudget>;
  generalDocuments: Collection<GeneralDocument>;
};

export const getOrCreateCollection = <T extends object>(db: loki, name: string, options: Partial<CollectionOptions<T>>): Collection<T> => {
  let collection = db.getCollection<T>(name);
  if (!collection) {
    collection = db.addCollection<T>(name, options);
  }
  return collection;
};


export const getFeed = (db: loki): ApplicationFeed => {
  return {
    accounts: getOrCreateCollection<Account>(db, 'accounts', {
      unique: ['id', 'index'],
    }),
    transactions: getOrCreateCollection<Transaction>(db, 'transactions', {
      unique: ['id'],
    }),
    labels: getOrCreateCollection<Label>(db, 'labels', {
      unique: ['id', 'accent'],
    }),
    recurringTransactions: getOrCreateCollection<RecurringTransaction>(db, 'recurringTransactions', {
      unique: ['id'],
    }),
    categories: getOrCreateCollection<Category>(db, 'categories', {
      unique: ['id'],
    }),
    budgets: getOrCreateCollection<Budget>(db, 'budgets', {
      unique: ['id'],
    }),
    recurringBudgets: getOrCreateCollection<RecurringBudget>(db, 'recurringBudgets', {
      unique: ['id'],
    }),
    generalDocuments: getOrCreateCollection<GeneralDocument>(db, 'generalDocuments', {
      unique: ['id'],
    }),
  };
};
