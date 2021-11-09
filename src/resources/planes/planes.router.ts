import { Planes } from '../../entities';
import { getRepository } from 'typeorm';
import { Router } from 'express';

const router = Router();

router.route('/').get(async (req, res) => {
  const tt = String(req.query['tt']);

  const planesRepo = getRepository(Planes);

  try {
    const planes = await planesRepo.findOneOrFail({ tt });
    res.status(200).send(planes);
  } catch (err) {
    res.status(500);
  }
});

router.route('/').post(async (req, res) => {
  const dto = req.body;

  const planesRepo = getRepository(Planes);
  const planes = await planesRepo.find({ tt: dto.tt });

  if (planes.length === 0) {
    const newPlanes = planesRepo.create(dto);
    await planesRepo.save(newPlanes);
    res.status(201).send('created');
  } else {
    await planesRepo.update({ tt: dto.tt }, dto);
    res.status(201).send('updated');
  }
});

export const planesRouter = router;
