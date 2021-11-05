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
        const planes = await planesRepo.findOneOrFail({ tt });
        res.status(200).send(planes);
    }
    catch (err) {
        res.status(500);
    }
});
router.route('/').post(async (req, res) => {
    const dto = req.body;
    const planesRepo = (0, typeorm_1.getRepository)(entities_1.Planes);
    const plane = new entities_1.Planes();
    plane.cm = dto.cm;
    plane.ca = dto.ca;
    plane.cz = dto.cz;
    plane.to_cm = dto.to_cm;
    plane.to_cz = dto.to_cz;
    try {
        await planesRepo.save(plane);
        res.status(201).send('created');
    }
    catch (err) {
        res.status(500);
    }
});
exports.planesRouter = router;
