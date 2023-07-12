import { Router } from 'express';
import { createBasicAuthMiddleware } from '../middlewares/basic-auth';
import { PROTO_APP_PASS_PHRASE } from '../constants';
import { constructProtoFilePath, listAllProtoFiles, readProtoFile } from '../proto-file-utils';
import multer from 'multer';
import { DefaultFileStorage } from '../multer-provider';

const router = Router();

const AuthMiddleware = createBasicAuthMiddleware(PROTO_APP_PASS_PHRASE);

const MulterStorageMiddleware = multer({
  storage: DefaultFileStorage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

router.get('/db/list', AuthMiddleware, (_, res) => {
  return res.json({
    data: listAllProtoFiles(),
  });
});

router.get('/db/:dbName', AuthMiddleware, (req, res) => {
  const { dbName } = req.params;
  const protoFilePath = constructProtoFilePath(dbName);
  return res.sendFile(protoFilePath);
});

router.post('/db/:dbName', AuthMiddleware, MulterStorageMiddleware.single('protoDb'), (req, res) => {
  res.send('OK');
});
  

export default router;
