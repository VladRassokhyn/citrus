import { createConnection, ConnectionOptions } from 'typeorm';
import {
  User,
  Checklist,
  Category,
  Field,
  Planes,
  Sales,
  DaySales,
  Salesman,
} from './entities';

export const connectToDb = async () => {
  try {
    await createConnection({
      type: 'postgres',
      port: +process.env['DB_PORT']!,
      username: process.env['DB_USERNAME'] as string,
      database: process.env['DB_USERNAME'] as string,
      password: process.env['DB_PASSWORD'] as string,
      host: process.env['DB_HOSTNAME'] as string,
      entities: [
        User,
        Planes,
        Checklist,
        Category,
        Field,
        DaySales,
        Salesman,
        Sales,
      ],
      synchronize: true,
      logging: false,
      keepConnectionAlive: true,
    } as ConnectionOptions);
  } catch (err: any) {
    console.log(err.message);
  }
};

export const TryDbConnect = async (cb: () => void) => {
  try {
    await connectToDb();
    cb();
  } catch (e) {
    console.error('TryDbConnect err');
  }
};
