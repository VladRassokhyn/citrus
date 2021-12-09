"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const user_service_1 = require("./user.service");
const meddleware_1 = require("../../meddleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router
    .route('/')
    .get([meddleware_1.checkJwt, meddleware_1.isAdminUser], async (req, res) => {
    const tt = String(req.query['tt']);
    const isAdmin = res.locals['isAdminUser'];
    try {
        const users = await user_service_1.userService.getAllUsers(isAdmin, tt);
        res.status(200).send(users);
    }
    catch (err) {
        res.status(500);
    }
});
router.route('/:id').get(async (req, res) => {
    const id = Number(req.params['id']);
    try {
        const user = await user_service_1.userService.getUserById(id);
        res.status(200).send(user);
    }
    catch (error) {
        res.status(404).send('User not found');
    }
});
router
    .route('/')
    .post([meddleware_1.checkJwt, (0, meddleware_1.checkRole)(['ADMIN', 'MANAGER'])], async (req, res) => {
    try {
        await user_service_1.userService.createNewUser(req.body);
        res.status(201).send('User created');
    }
    catch (err) {
        res.status(409).send(err);
    }
});
router
    .route('/:id')
    .put([meddleware_1.checkJwt], (0, meddleware_1.checkRole)(['ADMIN']), async (req, res) => {
    const id = Number(req.params['id']);
    try {
        await user_service_1.userService.updateUser(req.body, id);
        res.status(201).send('updated');
    }
    catch (e) {
        res.status(500);
        return;
    }
});
router
    .route('/:id')
    .delete([meddleware_1.checkJwt, (0, meddleware_1.checkRole)(['ADMIN', 'MANAGER'])], async (req, res) => {
    const id = Number(req.params['id']);
    try {
        await user_service_1.userService.deleteUser(id);
        res.status(204).send();
    }
    catch (err) {
        res.status(500);
    }
});
exports.userRouter = router;
