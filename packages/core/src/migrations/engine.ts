import { GeneralDocumentIds } from '@protowallet/lookups';
import { migration as M001 } from './migration-001';
import { GeneralDocument } from '@protowallet/types';

const migrations = [
  M001,
];

export const latestVersion = migrations[migrations.length - 1].version;

export const applyMigrations = async (db: Loki) => {
  const migrationMetaDataDoc = db.getCollection<GeneralDocument>('generalDocuments').findOne({ id: GeneralDocumentIds.MIGRATION_META_DATA });
  let currentVersion = 0;
  if (migrationMetaDataDoc) {
    currentVersion = (migrationMetaDataDoc.data as { version: number }).version;
  }

  const migrationsToApply = migrations.filter((m) => m.version > currentVersion);

  if (migrationsToApply.length === 0) {
    return;
  }

  console.log(`Applying migrations: ${migrationsToApply.map((m) => m.version).join(', ')}`);
  for (const migration of migrationsToApply) {
    await migration.apply(db);
  }

  // @ts-ignore
  migrationMetaDataDoc?.data.version = latestVersion;

  // @ts-ignorexw
  db.getCollection<GeneralDocument>('generalDocuments').update(migrationMetaDataDoc);
};
