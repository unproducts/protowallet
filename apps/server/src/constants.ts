import * as path from 'path';

export const PROTO_DB_STORAGE_FOLDER_ROOT = '/tmp/proto-db-storage';
export const PROTO_APP_BUILD_PATH = path.join(__dirname, '../../web/dist');
export const PROTO_APP_PASS_PHRASE = process.env.PASS_PHRASE;