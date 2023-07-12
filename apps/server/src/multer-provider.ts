import multer from 'multer';
import { PROTO_DB_STORAGE_FOLDER_ROOT } from './constants';

export const DefaultFileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PROTO_DB_STORAGE_FOLDER_ROOT);
  },
  filename: function (req, file, cb) {
    const { dbName } = req.params;
    const protoFileName = `${dbName}.proto`;
    cb(null, protoFileName);
  },
});
