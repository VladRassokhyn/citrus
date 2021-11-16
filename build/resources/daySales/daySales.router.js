"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daySalesRouter = void 0;
const entities_1 = require("./../../entities");
const typeorm_1 = require("typeorm");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/').get(async (req, res) => {
    const tt = String(req.query['tt']);
    const daySalesRepo = (0, typeorm_1.getRepository)(entities_1.DaySales);
    const daySales = daySalesRepo.find({ tt });
    res.status(200).send(daySales);
});
router.route('/').post(async (req, res) => {
    const dto = req.body;
    const daySalesRepo = (0, typeorm_1.getRepository)(entities_1.DaySales);
    if (dto.id) {
        await daySalesRepo.update(dto.id, dto);
        res.status(205).send('updated');
    }
    else {
        const newDaySales = daySalesRepo.create(dto);
        await daySalesRepo.save(newDaySales);
        res.status(201).send('created');
    }
});
exports.daySalesRouter = router;
