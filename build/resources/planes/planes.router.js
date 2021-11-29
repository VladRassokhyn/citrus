"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planesRouter = void 0;
const entities_1 = require("../../entities");
const typeorm_1 = require("typeorm");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/').get(async (req, res) => {
    const tt = String(req.query['tt']);
    const mounth = String(req.query['mounth']);
    const year = String(req.query['year']);
    try {
        const planesRepo = (0, typeorm_1.getRepository)(entities_1.Planes);
        const planes = await planesRepo.findOne({ tt, mounth, year });
        res.status(200).send(planes);
    }
    catch (err) {
        res.status(404);
    }
});
router.route('/').post(async (req, res) => {
    const dto = req.body;
    const planesRepo = (0, typeorm_1.getRepository)(entities_1.Planes);
    try {
        const newPlanes = planesRepo.create(dto);
        await planesRepo.save(newPlanes);
        res.status(201).send('created');
    }
    catch (err) {
        res.status(500).send('cannot create');
    }
});
router.route('/:id').put(async (req, res) => {
    const id = +req.params['id'];
    const dto = req.body;
    const planesRepo = (0, typeorm_1.getRepository)(entities_1.Planes);
    try {
        await planesRepo.update(id, dto);
        res.status(201).send('created');
    }
    catch (err) {
        res.status(500).send('cannot update');
    }
});
exports.planesRouter = router;
