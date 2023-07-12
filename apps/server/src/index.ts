import express, { Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROTO_APP_BUILD_PATH, PROTO_APP_PASS_PHRASE } from './constants';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();

const passPhrase = PROTO_APP_PASS_PHRASE;

app.use(express.static(PROTO_APP_BUILD_PATH));

app.get('*', (_, res) => {
  res.sendFile(path.join(PROTO_APP_BUILD_PATH, '/index.html'));
});

app.listen(3000, () => {
  console.log('Proto server running on port 3000!');
});
