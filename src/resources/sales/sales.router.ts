import { Shop } from './../../entities/Shop.model';
import { Sales, Salesman } from './../../entities';
import { getRepository } from 'typeorm';
import { Router } from 'express';

const router = Router();

router.route('/').get(async (req, res) => {
  const tt = String(req.query['tt']);
  const month = String(req.query['month']);
  const year = String(req.query['year']);

  const isPPC = tt === 'KIEV_ALL';

  const salesRepo = getRepository(Sales);
  const salesmanRepo = getRepository(Salesman);
  const shopRepo = getRepository(Shop);
  const salesByTT = await salesRepo.find({ tt, month, year });
  let salesmansNames: string[] = [];

  if (!isPPC) {
    const salesmans = await salesmanRepo.find({ tt });
    salesmansNames = salesmans.map((salesman) => salesman.name);
  } else {
    const shops = await shopRepo.find();
    salesmansNames = shops.map((shop) => shop.name_1c);
  }

  const parsedSales: any[] = [];
  salesByTT.forEach((item: any) => {
    parsedSales.push({ ...item, sales: parse(String(item.sales)) });
  });

  const regions = [
    'Винницкий регион',
    'Ивано-Франковский регион',
    'Киевский регион',
    'Львовский регион',
    'Черниговский регион',
  ];

  const sales: any[] = [];
  parsedSales.forEach((salesItem) => {
    const items: (string | number)[][] = [];
    let ttSales: (string | number)[] = [];
    salesItem.sales.forEach((item: any, index: number) => {
      if (isPPC) {
        if (regions.includes(item[0])) {
          if (ttSales.length === 0) {
            ttSales = item;
          } else {
            ttSales.forEach((sale, i) => {
              if (i !== 0) {
                ttSales[i] += item[i];
              }
            });
            ttSales[0] = 'Киевский регион';
          }
        }
      } else if (index === 3) {
        ttSales = item;
      }
      if (salesmansNames.includes(item[0]) && item[0] !== 'Киевский регион') {
        items.push(item);
      }
    });
    sales.push({ ...salesItem, sales: items, ttSales });
  });
  res.status(200).send(sales);
});

router.route('/').post(async (req, res) => {
  const dto = req.body;
  const salesRepo = getRepository(Sales);
  try {
    const newDaySales = salesRepo.create(dto);
    await salesRepo.save(newDaySales);
    res.status(201).send('created');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route('/').put(async (req, res) => {
  const dto = req.body;
  const salesRepo = getRepository(Sales);

  const sales = await salesRepo.find({ id: dto.id });
  if (sales) {
    await salesRepo.update(dto.id, dto);
    res.status(201).send('updated');
  } else {
    res.status(404).send('Sales not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = Number(req.params['id']);
  const salesRepo = getRepository(Sales);
  try {
    await salesRepo.delete(id);
    res.status(200).send('deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

export const salesRouter = router;

function parse(input: string) {
  const inputToArray = input.split('+');
  let result: (string | number)[][] = [];
  let tmp: string[] = [];

  inputToArray.forEach((item, index) => {
    tmp.push(item.substring(0, item.length - 1));

    if ((index + 1) % 17 === 0) {
      result.push(tmp);
      tmp = [];
    }
  });

  result = result.map((resItem, index) => {
    if (index !== 0 && index !== 1) {
      return (resItem = resItem.map((subres, i) => {
        if (i !== 0) {
          const value = parseInt((subres as string).replace(/\s/g, ''));
          return isNaN(value) ? 0 : value;
        } else {
          return subres;
        }
      }));
    } else {
      return resItem;
    }
  });

  return result;
}
