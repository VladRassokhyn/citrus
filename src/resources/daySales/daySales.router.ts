import { DaySales } from './../../entities';
import { getRepository } from 'typeorm';
import { Router } from 'express';

const router = Router();

router.route('/').get(async (req, res) => {
  const tt = String(req.query['tt']);

  const daySalesRepo = getRepository(DaySales);
  const daySales = daySalesRepo.find({ tt });
  res.status(200).send(daySales);
});

router.route('/').post(async (req, res) => {
  const dto = req.body;
  const daySalesRepo = getRepository(DaySales);
  if (dto.id) {
    await daySalesRepo.update(dto.id, dto);
    res.status(205).send('updated');
  } else {
    const newDaySales = daySalesRepo.create(dto);
    await daySalesRepo.save(newDaySales);
    res.status(201).send('created');
  }
});

export const daySalesRouter = router;
