import { Currency, GeneralDocumentIds } from '@protowallet/lookups';
import { Migration } from './type';

export const migration: Migration = {
  version: 1,
  apply: async (db) => {
    db.getCollection('generalDocuments').insert({
      id: GeneralDocumentIds.PREFS,
      data: {
        currency: Currency.INR,
      },
    });
  },
};
