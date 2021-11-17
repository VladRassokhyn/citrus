import { DaySales } from './../../entities';
import { getRepository } from 'typeorm';
import { Router } from 'express';

const router = Router();

router.route('/').get(async (req, res) => {
  const tt = String(req.query['tt']);

  const daySalesRepo = getRepository(DaySales);
  const daySales = await daySalesRepo.find({ tt });
  res.status(200).send(daySales);
});

router.route('/').post(async (req, res) => {
  const dto = req.body;
  const daySalesRepo = getRepository(DaySales);
  const newDaySales = daySalesRepo.create(dto);
  await daySalesRepo.save(newDaySales);
  res.status(201).send('created');
});

router.route('/').put(async (req, res) => {
  const dto = req.body;
  const daySalesRepo = getRepository(DaySales);

  const daysSales = await daySalesRepo.find({ id: dto.id });
  if (daysSales) {
    await daySalesRepo.update(dto.id, dto);
    res.status(201).send('updated');
  } else {
    res.status(404).send('daySales not found');
  }
});

export const daySalesRouter = router;
