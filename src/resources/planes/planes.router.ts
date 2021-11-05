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

  const plane = new Planes();
  plane.cm = dto.cm;
  plane.ca = dto.ca;
  plane.cz = dto.cz;
  plane.to_cm = dto.to_cm;
  plane.to_cz = dto.to_cz;

  try {
    await planesRepo.save(plane);
    res.status(201).send('created');
  } catch (err) {
    res.status(500);
  }
});

export const planesRouter = router;
