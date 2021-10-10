"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSalesman = exports.getAllSalesmans = void 0;
const reposytorys_1 = require("../reposytorys");
const getAllSalesmans = () => reposytorys_1.salesmanRepo.getAllSalesmans();
exports.getAllSalesmans = getAllSalesmans;
const addSalesman = (dto) => reposytorys_1.salesmanRepo.addSalesman(dto);
exports.addSalesman = addSalesman;
