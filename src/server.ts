import express, { Request, Response, NextFunction } from 'express';
import { config as envConfig } from 'dotenv';
import path from 'path';
import { TryDbConnect } from './db';
import cors from 'cors';
import { salesmanRouter } from './routers';

envConfig();

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/') {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    return;
  }
  next();
});

app.use('/api/salesmans', salesmanRouter);

(async () => {
  await TryDbConnect(() =>
    app.listen(process.env['PORT'], () => console.log('running')),
  );
})();
