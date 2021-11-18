import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Salesman } from '../../entities';

const router = Router();

router.route('/').get(async (req, res) => {
  const tt = String(req.query['tt']);

  try {
    const salesmanRepo = getRepository(Salesman);
    const salsemans = await salesmanRepo.find({ tt });

    res.status(200).send(salsemans);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route('/').post(async (req, res) => {
  const dto: Salesman = req.body;
  try {
    const salesmanRepo = getRepository(Salesman);
    const newSalesman = salesmanRepo.create(dto);
    await salesmanRepo.save(newSalesman);

    res.status(201).send('created');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = Number(req.params['id']);
  try {
    const salesmanRepo = getRepository(Salesman);
    await salesmanRepo.delete(id);

    res.status(200).send('deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

export const salesmanRouter = router;
