import express, { Request, Response, NextFunction } from 'express';
import { config as envConfig } from 'dotenv';
import path from 'path';
import { TryDbConnect } from './db';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {
  userRouter,
  authRouter,
  checklistRouter,
  planesRouter,
  daySalesRouter,
} from './resources';

envConfig();

export const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

const rootUrls = [
  '/',
  '/cm',
  '/users',
  '/login',
  '/analytics',
  '/checklist',
  '/analytics/main',
  '/analytics/evening-report',
];

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (rootUrls.includes(req.url)) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    return;
  }
  next();
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/planes', planesRouter);
app.use('/api/daySales', daySalesRouter);
app.use('/api/checklist', checklistRouter);

(async () => {
  await TryDbConnect(() =>
    app.listen(process.env['PORT'], () =>
      console.log('running ' + process.env['PORT']),
    ),
  );
})();
