"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesmanRouter = void 0;
const services_1 = require("../services");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route('/').get(async (req, res) => {
    try {
        const salesmans = await services_1.salesmanService.getAllSalesmans();
        res.json(salesmans);
    }
    catch (err) {
        console.error('salesman get all route error');
        res.json('error');
    }
});
router.route('/').post(async (req, res) => {
    const adminPassword = req.body.adminPassword;
    if (adminPassword === '12321') {
        try {
            const salesmans = await services_1.salesmanService.addSalesman(req.body.dto);
            res.json(salesmans);
        }
        catch (err) {
            res.json(err);
        }
    }
    else {
        res.statusCode = 403;
        res.json({ message: 'Incorrect admin password' });
    }
});
router.route('/').put(async (req, res) => {
    const adminPassword = req.body.adminPassword;
    if (adminPassword === '12321') {
        try {
            const salesman = await services_1.salesmanService.updateSalesman(req.body.dto);
            res.json(salesman);
        }
        catch (err) {
            return err;
        }
    }
    else {
        res.statusCode = 403;
        res.json({ message: 'Incorrect admin password' });
    }
});
router.route('/').delete(async (req, res) => {
    const adminPassword = req.body.adminPassword;
    if (adminPassword === '12321') {
        try {
            const id = await services_1.salesmanService.removeSalesman(req.body.salesmanId);
            res.json({ id, message: 'Deleted' });
        }
        catch (err) {
            res.json(err);
        }
    }
    else {
        res.statusCode = 403;
        res.json({ message: 'Incorrect admin password' });
    }
});
exports.salesmanRouter = router;
