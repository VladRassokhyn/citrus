import { createConnection, ConnectionOptions } from 'typeorm';
import { User, Checklist, Category, Field } from './entities';

export const connectToDb = async () => {
  try {
    await createConnection({
      type: 'postgres',
      port: +process.env['DB_PORT']!,
      username: process.env['DB_USERNAME'] + '',
      database: process.env['DB_USERNAME'] + '',
      password: process.env['DB_PASSWORD'] + '',
      host: process.env['DB_HOSTNAME'] + '',
      entities: [User, Checklist, Category, Field],
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
