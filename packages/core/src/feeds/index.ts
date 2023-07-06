import loki from "lokijs";

import { Account, Transaction, Label, RecurringTransaction, Category, Budget, RecurringBudget } from "@protowallet/types";

const db = new loki('application.db');

const accountsCollection = db.addCollection<Account>('accounts', {
  unique: ['id', 'index'],
});

const transactionsCollection = db.addCollection<Transaction>('transactions', {
  unique: ['id'],
});

const recurringTransactionsCollection = db.addCollection<RecurringTransaction>('recurringTransactions', {
  unique: ['id'],
});

const labelsCollection = db.addCollection<Label>('labels', {
  unique: ['id', 'accent'],
});

const categoriesCollection = db.addCollection<Category>('categories', {
  unique: ['id'],
});

const budgetsCollection = db.addCollection<Budget>('budgets', {
  unique: ['id'],
});

const recurringBudgetCollection = db.addCollection<RecurringBudget>('recurringBudgets', {
  unique: ['id'],
});

const feed = {
  accounts: accountsCollection,
  transactions: transactionsCollection,
  labels: labelsCollection,
  recurringTransactions: recurringTransactionsCollection,
  categories: categoriesCollection,
  budgets: budgetsCollection,
  recurringBudgets: recurringBudgetCollection,
};

export type ApplicationFeed = typeof feed;

export default feed;
