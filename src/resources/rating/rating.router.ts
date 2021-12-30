import { getRepository } from 'typeorm';
import { Router } from 'express';
import { Sales, Salesman } from '../../entities';
import { parse } from '../sales/sales.router';

const router = Router();

router.route('/').get(async (req, res) => {
  const month = String(req.query['month']);
  const year = String(req.query['year']);
  const salesRepo = getRepository(Sales);
  const salesmanRepo = getRepository(Salesman);

  const salesmans = await salesmanRepo.find();
  const allsales = await salesRepo.find({ month, year, tt: 'KIEV_ALL' });

  const salesmansNames = salesmans.map((salesman) => salesman.name);

  const sales1: any[] = [];
  allsales.forEach((item: any) => {
    sales1.push({ sales: parse(String(item.sales)) });
  });

  const sales: any[][] = [];
  sales1.forEach((salesItem) => {
    salesItem.sales.forEach((item: any, index: number) => {
      if (salesmansNames.includes(item[0])) {
        sales.push(item);
      }
    });
  });

  let result: any = [];
  salesmansNames.forEach((name) => {
    const salesByName: any = [];
    sales.forEach((sale) => {
      if (sale[0] === name) {
        salesByName.push(sale);
      }
    });
    const res = salesByName.reduce((acc: any, curr: any) => {
      acc.forEach((cell: any, index: number) => {
        if (index !== 0) {
          acc[index] += curr[index];
        } else {
          acc[index] = curr[index];
        }
      });
      return acc;
    }, salesByName[0]);
    result.push(res);
  });

  res.send(result);
});

export const ratingRouter = router;
