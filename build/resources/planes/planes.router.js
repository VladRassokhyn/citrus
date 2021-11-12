"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planesRouter = void 0;
const entities_1 = require("../../entities");
const typeorm_1 = require("typeorm");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/').get(async (req, res) => {
    const tt = String(req.query['tt']);
    const planesRepo = (0, typeorm_1.getRepository)(entities_1.Planes);
    try {
        const planes = await planesRepo.findOne({ tt });
        res.status(200).send(planes);
    }
    catch (err) {
        res.status(404);
    }
});
router.route('/').post(async (req, res) => {
    const dto = req.body;
    const planesRepo = (0, typeorm_1.getRepository)(entities_1.Planes);
    const planes = await planesRepo.find({ tt: dto.tt });
    if (planes.length === 0) {
        const newPlanes = planesRepo.create(dto);
        await planesRepo.save(newPlanes);
        res.status(201).send('created');
    }
    else {
        await planesRepo.update({ tt: dto.tt }, dto);
        res.status(201).send('updated');
    }
});
exports.planesRouter = router;
