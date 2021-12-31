"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingRouter = void 0;
const typeorm_1 = require("typeorm");
const express_1 = require("express");
const entities_1 = require("../../entities");
const sales_router_1 = require("../sales/sales.router");
const router = (0, express_1.Router)();
router.route('/').get(async (req, res) => {
    const month = String(req.query['month']);
    const year = String(req.query['year']);
    const salesRepo = (0, typeorm_1.getRepository)(entities_1.Sales);
    const salesmanRepo = (0, typeorm_1.getRepository)(entities_1.Salesman);
    const salesmans = await salesmanRepo.find();
    const allsales = await salesRepo.find({ month, year, tt: 'KIEV_ALL' });
    const salesmansNames = salesmans.map((salesman) => salesman.name);
    const sales1 = [];
    allsales.forEach((item) => {
        sales1.push({ sales: (0, sales_router_1.parse)(String(item.sales)) });
    });
    const sales = [];
    sales1.forEach((salesItem) => {
        salesItem.sales.forEach((item, index) => {
            if (salesmansNames.includes(item[0])) {
                sales.push(item);
            }
        });
    });
    const result = [];
    salesmansNames.forEach((name) => {
        const salesByName = [];
        sales.forEach((sale) => {
            if (sale[0] === name) {
                salesByName.push(sale);
            }
        });
        const res = salesByName.reduce((acc, curr) => {
            acc.forEach((cell, index) => {
                if (index !== 0) {
                    acc[index] = parseInt(acc[index]) + parseInt(curr[index]);
                }
                else {
                    acc[index] = curr[index];
                }
            });
            return acc;
        }, ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        result.push(res);
    });
    result.sort((a, b) => b[8] - a[8]);
    res.send(result);
});
exports.ratingRouter = router;
