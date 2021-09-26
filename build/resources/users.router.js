"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordsRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_service_1 = require("./users.service");
const router = express_1.default.Router();
router.route('/').post(async (req, res) => {
    const { id } = await users_service_1.wordsService.postWord(req.body);
    res.json(id);
});
router.route('/').get(async (req, res) => {
    const words = await users_service_1.wordsService.getAll();
    res.json(words);
});
router.route('/').put(async (req, res) => {
    const word = await users_service_1.wordsService.updateWord(req.body);
    if (word) {
        res.json({ message: 'success' });
    }
    else {
        res.json({ message: 'error' });
    }
});
router.route('/:id').delete(async (req, res) => {
    try {
        await users_service_1.wordsService.deleteWord(req.params['id']);
        res.json({ message: 'successful deleted' });
    }
    catch (err) {
        res.json({ message: 'something wrong' });
    }
});
router.route('/book').get(async (req, res) => {
    const text = await users_service_1.wordsService.getPages(+req.query['page']);
    res.json(text);
});
exports.wordsRouter = router;
