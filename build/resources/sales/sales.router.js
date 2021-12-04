"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesRouter = void 0;
const Shop_model_1 = require("./../../entities/Shop.model");
const entities_1 = require("./../../entities");
const typeorm_1 = require("typeorm");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/').get(async (req, res) => {
    const tt = String(req.query['tt']);
    const month = String(req.query['month']);
    const year = String(req.query['year']);
    const salesRepo = (0, typeorm_1.getRepository)(entities_1.Sales);
    const salesmanRepo = (0, typeorm_1.getRepository)(entities_1.Salesman);
    const shopRepo = (0, typeorm_1.getRepository)(Shop_model_1.Shop);
    const salesByTT = await salesRepo.find({ tt, month, year });
    let salesmansNames = [];
    if (tt === 'KIEV_ALL') {
        const salesmans = await salesmanRepo.find({ tt });
        salesmansNames = salesmans.map((salesman) => salesman.name);
    }
    else {
        const shops = await shopRepo.find();
        salesmansNames = shops.map((shop) => shop.name);
    }
    const parsedSales = [];
    salesByTT.forEach((item) => {
        parsedSales.push({ ...item, sales: parse(String(item.sales)) });
    });
    const sales = [];
    parsedSales.forEach((salesItem) => {
        const items = [];
        let ttSales = [];
        salesItem.sales.forEach((item, index) => {
            if (index === 3) {
                ttSales = item;
            }
            if (salesmansNames.includes(item[0])) {
                items.push(item);
            }
        });
        sales.push({ ...salesItem, sales: items, ttSales });
    });
    res.status(200).send(sales);
});
router.route('/').post(async (req, res) => {
    const dto = req.body;
    const salesRepo = (0, typeorm_1.getRepository)(entities_1.Sales);
    try {
        const newDaySales = salesRepo.create(dto);
        await salesRepo.save(newDaySales);
        res.status(201).send('created');
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router.route('/').put(async (req, res) => {
    const dto = req.body;
    const salesRepo = (0, typeorm_1.getRepository)(entities_1.Sales);
    const sales = await salesRepo.find({ id: dto.id });
    if (sales) {
        await salesRepo.update(dto.id, dto);
        res.status(201).send('updated');
    }
    else {
        res.status(404).send('Sales not found');
    }
});
router.route('/:id').delete(async (req, res) => {
    const id = Number(req.params['id']);
    const salesRepo = (0, typeorm_1.getRepository)(entities_1.Sales);
    try {
        await salesRepo.delete(id);
        res.status(200).send('deleted');
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.salesRouter = router;
function parse(input) {
    const inputToArray = input.split('+');
    let result = [];
    let tmp = [];
    inputToArray.forEach((item, index) => {
        tmp.push(item.substring(0, item.length - 1));
        if ((index + 1) % 17 === 0) {
            result.push(tmp);
            tmp = [];
        }
    });
    result = result.map((resItem, index) => {
        if (index !== 0 && index !== 1) {
            return (resItem = resItem.map((subres, i) => {
                if (i !== 0) {
                    const value = parseInt(subres.replace(/\s/g, ''));
                    return isNaN(value) ? 0 : value;
                }
                else {
                    return subres;
                }
            }));
        }
        else {
            return resItem;
        }
    });
    return result;
}
