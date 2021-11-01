"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const meddleware_1 = require("./../meddleware");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const class_validator_1 = require("class-validator");
const router = express_1.default.Router();
router.route('/').get([meddleware_1.checkJwt], async (req, res) => {
    const tt = req.query['tt'];
    const isAdmin = res.locals['jwtPayload'].userId === 1 ||
        res.locals['jwtPayload'].userId === 2;
    console.log(res.locals['jwtPayload']);
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    const users = await userRepository.find({
        select: ['id', 'username', 'role', 'name', 'lastName', 'tt'],
    });
    if (!isAdmin) {
        const toRes = users.filter((user) => user.tt === tt);
    }
    res.send(users);
});
router.route('/:id').get(async (req, res) => {
    const id = req.params['id'];
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    try {
        const user = await userRepository.findOneOrFail(id, {
            select: ['id', 'name', 'lastName', 'username', 'role', 'tt'],
        });
        console.log(user);
        res.send(user);
    }
    catch (error) {
        res.status(404).send('User not found');
    }
});
router.route('/').post(
//[checkJwt, checkRole(['ADMIN'])],
async (req, res) => {
    const { username, password, role, name, lastName, tt } = req.body;
    const user = new entities_1.User();
    user.username = username;
    user.password = password;
    user.name = name;
    user.tt = tt;
    user.lastName = lastName;
    user.role = role;
    const errors = await (0, class_validator_1.validate)(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    user.hashPassword();
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    try {
        await userRepository.save(user);
    }
    catch (e) {
        res.status(409).send(e);
        return;
    }
    res.status(201).send('User created');
});
router.route('/:id').put([meddleware_1.checkJwt], async (req, res) => {
    const id = req.params['id'];
    const { username, role } = req.body;
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    let user;
    try {
        user = await userRepository.findOneOrFail(id);
    }
    catch (error) {
        res.status(404).send('User not found');
        return;
    }
    user.username = username;
    user.role = role;
    const errors = await (0, class_validator_1.validate)(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    try {
        await userRepository.save(user);
    }
    catch (e) {
        res.status(409).send('username already in use');
        return;
    }
    res.status(204).send();
});
router
    .route('/:id')
    .delete([meddleware_1.checkJwt, (0, meddleware_1.checkRole)(['ADMIN'])], async (req, res) => {
    const id = req.params['id'];
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    let user;
    try {
        user = await userRepository.findOneOrFail(id);
    }
    catch (error) {
        res.status(404).send('User not found');
        return;
    }
    userRepository.delete(id);
    res.status(204).send();
});
exports.userRouter = router;
