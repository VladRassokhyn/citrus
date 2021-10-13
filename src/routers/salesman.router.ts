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
  try {
    const salesmans = await salesmanService.addSalesman({ ...req.body });
    res.json(salesmans);
  } catch (err) {
    res.json(err);
  }
});

router.route('/').put(async (req, res) => {
  try {
    const salesman = await salesmanService.updateSalesman(req.body);
    res.json(salesman);
  } catch (err) {
    return err;
  }
});

router.route('/').delete(async (req, res) => {
  try {
    const id = await salesmanService.removeSalesman(req.body.salesmanId);
    res.json({ id, message: 'Deleted' });
  } catch (err) {
    res.json(err);
  }
});

export const salesmanRouter = router;
