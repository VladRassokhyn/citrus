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
  salesmanRouter,
  salesRouter,
  todoRouter,
} from './resources';
import { shopRouter } from './resources/Shop';

envConfig();

export const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../client/build')));

const rootUrls = [
  '/',
  '/cm',
  '/users',
  '/users/:userId',
  '/login',
  '/todo',
  '/analytics',
  '/checklist',
  '/checklist/:checklistId',
  '/analytics/main',
  '/analytics/main/:salesDay',
  '/analytics/evening-report',
  '/analytics/salesmans',
  '/analytics/period-to-period',
];

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (rootUrls.includes(req.url)) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    return;
  }
  next();
});

app.use('/api/todo', todoRouter);
app.use('/api/auth', authRouter);
app.use('/api/shops', shopRouter);
app.use('/api/users', userRouter);
app.use('/api/sales', salesRouter);
app.use('/api/planes', planesRouter);
app.use('/api/salesman', salesmanRouter);
app.use('/api/checklist', checklistRouter);

(async () => {
  await TryDbConnect(() =>
    app.listen(process.env['PORT'], () =>
      console.log('running ' + process.env['PORT']),
    ),
  );
})();
