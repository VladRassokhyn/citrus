import { getRepository } from 'typeorm';
import { Router } from 'express';
import { Shop } from '../../entities';

const router = Router();

router.route('/').get(async (req, res) => {
  const shopRepo = getRepository(Shop);
  try {
    const shops = await shopRepo.find();
    res.status(200).send(shops);
  } catch (e) {
    res.status(500).send('get error');
  }
});

router.route('/').post(async (req, res) => {
  const dto = req.body;
  const shopRepo = getRepository(Shop);
  try {
    const newShop = shopRepo.create(dto);
    await shopRepo.save(newShop);
    res.status(201).send('created');
  } catch (e) {
    res.status(500).send('post error');
  }
});

router.route('/').put(async (req, res) => {
  const dto = req.body;
  const shopRepo = getRepository(Shop);
  try {
    await shopRepo.update(dto.id, dto);
    res.status(201).send('updated');
  } catch (e) {
    res.status(500).send('put error');
  }
});

router.route('/:shopId').delete(async (req, res) => {
  const id = req.params['shopId'];
  const shopRepo = getRepository(Shop);
  try {
    await shopRepo.delete(id);
    res.status(201).send('deleted');
  } catch (e) {
    res.status(500).send('delete error');
  }
});

export const shopRouter = router;
