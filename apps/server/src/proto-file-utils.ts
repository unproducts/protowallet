import * as fs from 'fs';
import * as path from 'path';

import { PROTO_DB_STORAGE_FOLDER_ROOT } from './constants';

export const listAllProtoFiles = () => {
  const files = fs.readdirSync(PROTO_DB_STORAGE_FOLDER_ROOT);
  const protoFiles = files.filter((file) => file.endsWith('.proto'));

  const filenames = protoFiles.filter((file) => file.endsWith('.proto'));

  const dbNames = filenames.map((filename) => filename.replace('.proto', ''));

  return dbNames;
};

export const constructProtoFilePath = (dbName: string) => {
  return path.join(PROTO_DB_STORAGE_FOLDER_ROOT, `${dbName}.proto`);
};

export const readProtoFile = (dbName: string) => {
  const protoFilePath = constructProtoFilePath(dbName);
  return fs.readFileSync(protoFilePath, 'utf8');
};

