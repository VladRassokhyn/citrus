"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesmanRouter = void 0;
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const entities_1 = require("../../entities");
const router = (0, express_1.Router)();
router.route('/').get(async (req, res) => {
    const tt = String(req.query['tt']);
    try {
        const salesmanRepo = (0, typeorm_1.getRepository)(entities_1.Salesman);
        const salsemans = await salesmanRepo.find({ tt });
        res.status(200).send(salsemans);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router.route('/').post(async (req, res) => {
    const dto = req.body;
    try {
        const salesmanRepo = (0, typeorm_1.getRepository)(entities_1.Salesman);
        const newSalesman = salesmanRepo.create(dto);
        await salesmanRepo.save(newSalesman);
        res.status(201).send('created');
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router.route('/:id').delete(async (req, res) => {
    const id = Number(req.params['id']);
    try {
        const salesmanRepo = (0, typeorm_1.getRepository)(entities_1.Salesman);
        await salesmanRepo.delete(id);
        res.status(200).send('deleted');
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.salesmanRouter = router;
