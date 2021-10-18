"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const meddleware_1 = require("../meddleware");
const class_validator_1 = require("class-validator");
const router = express_1.default.Router();
router.route('/').get(async (req, res) => {
    const token = req.headers['auth'];
    try {
        const jwtPayload = jsonwebtoken_1.default.verify(token, process.env['jwtSecret']);
        res.status(200).send({ userId: jwtPayload.userId });
    }
    catch (err) {
        res.status(401).send(err);
        console.log(err);
        return;
    }
});
router.route('/login').post(async (req, res) => {
    let { username, password } = req.body;
    if (!(username && password)) {
        res.status(400).send();
    }
    try {
        const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
        const user = await userRepository.findOneOrFail({ where: { username } });
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send();
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, process.env['jwtSecret'], { expiresIn: '24h' });
        res.send({
            token,
            user: { id: user.id, username: user.username, role: user.role },
        });
    }
    catch (err) {
        res.status(401).send(err);
    }
});
router
    .route('/change-password')
    .post([meddleware_1.checkJwt], async (req, res) => {
    const id = res.locals['jwtPayload'].userId;
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        res.status(400).send();
    }
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    let user = await userRepository.findOneOrFail(id);
    if (!user) {
        res.status(401).send();
    }
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        res.status(401).send();
        return;
    }
    user.password = newPassword;
    const errors = await (0, class_validator_1.validate)(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    user.hashPassword();
    userRepository.save(user);
    res.status(204).send();
});
exports.authRouter = router;
