import { createConnection, ConnectionOptions } from 'typeorm';
import { User, Checklist, Category, Field, Planes, DaySales } from './entities';

export const connectToDb = async () => {
  try {
    await createConnection({
      type: 'postgres',
      port: +process.env['DB_PORT']!,
      username: process.env['DB_USERNAME'] + '',
      database: process.env['DB_USERNAME'] + '',
      password: process.env['DB_PASSWORD'] + '',
      host: process.env['DB_HOSTNAME'] + '',
      entities: [User, Planes, Checklist, Category, Field, DaySales],
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
