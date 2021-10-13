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
  const adminPassword = req.body.adminPassword;
  if (adminPassword === '12321') {
    try {
      const salesmans = await salesmanService.addSalesman(req.body.dto);
      res.json(salesmans);
    } catch (err) {
      res.json(err);
    }
  } else {
    res.statusCode === 403;
    res.json({ message: 'Incorrect admin password' });
  }
});

router.route('/').put(async (req, res) => {
  const adminPassword = req.body.adminPassword;
  if (adminPassword === '12321') {
    try {
      const salesman = await salesmanService.updateSalesman(req.body.dto);
      res.json(salesman);
    } catch (err) {
      return err;
    }
  } else {
    res.statusCode === 403;
    res.json({ message: 'Incorrect admin password' });
  }
});

router.route('/').delete(async (req, res) => {
  const adminPassword = req.body.adminPassword;
  if (adminPassword === '12321') {
    try {
      const id = await salesmanService.removeSalesman(req.body.salesmanId);
      res.json({ id, message: 'Deleted' });
    } catch (err) {
      res.json(err);
    }
  } else {
    res.statusCode === 403;
    res.json({ message: 'Incorrect admin password' });
  }
});

export const salesmanRouter = router;
