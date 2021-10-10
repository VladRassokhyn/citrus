import { salesmanService } from '../services';
import express from 'express';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const salesmans = await salesmanService.getAllSalesmans();
    res.json(salesmans);
  } catch (err) {
    console.error('salesman get all route error');
    res.json('error');
  }
});

router.route('/').post(async (req, res) => {
  const salesmans = await salesmanService.addSalesman({ ...req.body });
  res.json(salesmans);
});

export const salesmanRouter = router;
