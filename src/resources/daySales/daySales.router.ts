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
  try {
    const newDaySales = daySalesRepo.create(dto);
    await daySalesRepo.save(newDaySales);
    res.status(201).send('created');
  } catch (err) {
    res.status(500).send(err);
  }
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

router.route('/:id').delete(async (req, res) => {
  const id = Number(req.params['id']);
  const daySalesRepo = getRepository(DaySales);
  try {
    await daySalesRepo.delete(id);
    res.status(200).send('deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

export const daySalesRouter = router;
