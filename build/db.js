"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryDbConnect = exports.connectToDb = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
const connectToDb = async () => {
    try {
        await (0, typeorm_1.createConnection)({
            type: 'postgres',
            port: +process.env['DB_PORT'],
            username: process.env['DB_USERNAME'] + '',
            database: process.env['DB_USERNAME'] + '',
            password: process.env['DB_PASSWORD'] + '',
            host: process.env['DB_HOSTNAME'] + '',
            entities: [entities_1.User, entities_1.Checklist, entities_1.Category, entities_1.Field],
            synchronize: true,
            logging: false,
            keepConnectionAlive: true,
        });
    }
    catch (err) {
        console.log(err.message);
    }
};
exports.connectToDb = connectToDb;
const TryDbConnect = async (cb) => {
    try {
        await (0, exports.connectToDb)();
        cb();
    }
    catch (e) {
        console.error('TryDbConnect err');
    }
};
exports.TryDbConnect = TryDbConnect;
