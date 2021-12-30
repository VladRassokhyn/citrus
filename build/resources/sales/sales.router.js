"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.salesRouter = void 0;
const Shop_model_1 = require("./../../entities/Shop.model");
const entities_1 = require("./../../entities");
const typeorm_1 = require("typeorm");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/').get(async (req, res) => {
    const tt = String(req.query['tt']);
    const month = String(req.query['month']);
    const year = String(req.query['year']);
    const isPPC = tt === 'KIEV_ALL' || tt === 'KHARKOV_ALL';
    const salesRepo = (0, typeorm_1.getRepository)(entities_1.Sales);
    const salesmanRepo = (0, typeorm_1.getRepository)(entities_1.Salesman);
    const shopRepo = (0, typeorm_1.getRepository)(Shop_model_1.Shop);
    const salesByTT = await salesRepo.find({ tt, month, year });
    let salesmansNames = [];
    if (!isPPC) {
        const salesmans = await salesmanRepo.find({ tt });
        salesmansNames = salesmans.map((salesman) => salesman.name);
    }
    else {
        const shops = await shopRepo.find({ region: tt });
        salesmansNames = shops.map((shop) => shop.name_1c);
    }
    const parsedSales = [];
    salesByTT.forEach((item) => {
        parsedSales.push({ ...item, sales: parse(String(item.sales)) });
    });
    const kievRegions = [
        'Винницкий регион',
        'Ивано-Франковский регион',
        'Киевский регион',
        'Львовский регион',
        'Черниговский регион',
        'Черкасский регион',
    ];
    const kharkovRegions = [
        'Полтавский регион',
        'Харьковский регион',
        'Краматорский регион',
    ];
    const sales = [];
    parsedSales.forEach((salesItem) => {
        const items = [];
        let ttSales = [];
        salesItem.sales.forEach((item, index) => {
            if (isPPC) {
                if (tt === 'KIEV_ALL') {
                    if (kievRegions.includes(item[0])) {
                        if (ttSales.length === 0) {
                            ttSales = item;
                        }
                        else {
                            ttSales.forEach((sale, i) => {
                                if (i !== 0) {
                                    ttSales[i] += item[i];
                                }
                            });
                            ttSales[0] = 'Киевский регион';
                        }
                    }
                }
                if (tt === 'KHARKOV_ALL') {
                    if (kharkovRegions.includes(item[0])) {
                        if (ttSales.length === 0) {
                            ttSales = item;
                        }
                        else {
                            ttSales.forEach((sale, i) => {
                                if (i !== 0) {
                                    ttSales[i] += item[i];
                                }
                            });
                            ttSales[0] = 'Харьковский регион';
                        }
                    }
                }
            }
            else if (index === 3) {
                ttSales = item;
            }
            if (salesmansNames.includes(item[0]) &&
                item[0] !== 'Киевский регион' &&
                item[0] !== 'Харьковский регион') {
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
router.route('/:id').put(async (req, res) => {
    const dto = req.body;
    const id = +req.params['id'];
    const salesRepo = (0, typeorm_1.getRepository)(entities_1.Sales);
    const sales = await salesRepo.find({ id });
    if (sales) {
        await salesRepo.update(id, dto);
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
exports.parse = parse;
