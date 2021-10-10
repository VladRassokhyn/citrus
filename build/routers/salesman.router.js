"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesmanRouter = void 0;
const services_1 = require("../services");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route('/').get(async (req, res) => {
    try {
        const salesmans = await services_1.salesmanService.getAllSalesmans();
        res.json(salesmans);
    }
    catch (err) {
        console.error('salesman get all route error');
        res.json('error');
    }
});
router.route('/').post(async (req, res) => {
    const salesmans = await services_1.salesmanService.addSalesman({ ...req.body });
    res.json(salesmans);
});
exports.salesmanRouter = router;
