import { Planes } from '../../entities';
import { getRepository } from 'typeorm';
import { Router } from 'express';

const router = Router();

router.route('/').get(async (req, res) => {
  const tt = String(req.query['tt']);
  const month = String(req.query['month']);
  const year = String(req.query['year']);

  try {
    const planesRepo = getRepository(Planes);
    const planes = await planesRepo.findOne({ tt, month, year });

    res.status(200).send(planes);
  } catch (err) {
    res.status(404);
  }
});

router.route('/').post(async (req, res) => {
  const dto = req.body;

  const planesRepo = getRepository(Planes);
  try {
    const newPlanes = planesRepo.create(dto);
    await planesRepo.save(newPlanes);
    res.status(201).send('created');
  } catch (err) {
    res.status(500).send('cannot create');
  }
});

router.route('/:id').put(async (req, res) => {
  const id = +req.params['id'];
  const dto = req.body;

  const planesRepo = getRepository(Planes);

  try {
    await planesRepo.update(id, dto);
    res.status(201).send('created');
  } catch (err) {
    res.status(500).send('cannot update');
  }
});

export const planesRouter = router;
