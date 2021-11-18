"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesRouter = void 0;
const entities_1 = require("./../../entities");
const typeorm_1 = require("typeorm");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/').get(async (req, res) => {
    const tt = String(req.query['tt']);
    const salesRepo = (0, typeorm_1.getRepository)(entities_1.Sales);
    const sales = await salesRepo.find({ tt });
    res.status(200).send(sales);
});
router.route('/').post(async (req, res) => {
    const dto = req.body;
    const salesRepo = (0, typeorm_1.getRepository)(entities_1.Sales);
    try {
        const newDaySales = salesRepo.create(dto);
        await salesRepo.save(newDaySales);
        res.status(201).send('created');
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router.route('/').put(async (req, res) => {
    const dto = req.body;
    const salesRepo = (0, typeorm_1.getRepository)(entities_1.Sales);
    const sales = await salesRepo.find({ id: dto.id });
    if (sales) {
        await salesRepo.update(dto.id, dto);
        res.status(201).send('updated');
    }
    else {
        res.status(404).send('Sales not found');
    }
});
router.route('/:id').delete(async (req, res) => {
    const id = Number(req.params['id']);
    const salesRepo = (0, typeorm_1.getRepository)(entities_1.Sales);
    try {
        await salesRepo.delete(id);
        res.status(200).send('deleted');
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.salesRouter = router;
