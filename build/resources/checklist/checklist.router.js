"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checklistRouter = void 0;
const express_1 = __importDefault(require("express"));
const meddleware_1 = require("../../meddleware");
const checklist_service_1 = require("./checklist.service");
const router = express_1.default.Router();
router.route('/').get(async (req, res) => {
    const passedOnly = req.query['passedOnly'] === 'true';
    const passerId = Number(req.query['passerId']);
    try {
        const checklistsToRes = await checklist_service_1.checklistService.getChecklists({
            passedOnly,
            passerId,
        });
        res.status(200).send(checklistsToRes);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router
    .route('/')
    .post([meddleware_1.checkJwt, (0, meddleware_1.checkRole)(['ADMIN', 'MANAGER'])], async (req, res) => {
    try {
        const newChecklistId = await checklist_service_1.checklistService.createNewChecklist(req.body);
        res.status(201).send({ id: newChecklistId });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
router.route('/:id').get(async (req, res) => {
    const id = Number(req.params['id']);
    try {
        const checklist = await checklist_service_1.checklistService.getChecklistById(id);
        res.status(200).send(checklist);
    }
    catch (err) {
        res.status(404).send('checklist not found');
    }
});
router
    .route('/:id')
    .delete([meddleware_1.checkJwt, (0, meddleware_1.checkRole)(['ADMIN', 'MANAGER'])], async (req, res) => {
    const deletorId = res.locals['jwtPayload'].userId;
    const checklistId = Number(req.params['id']);
    try {
        await checklist_service_1.checklistService.deleteChecklist(deletorId, checklistId);
        res.status(200).send('deleted');
    }
    catch (err) {
        console.log(err);
    }
});
exports.checklistRouter = router;
