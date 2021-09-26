"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryDbConnect = exports.connectToDb = void 0;
const typeorm_1 = require("typeorm");
const User_model_1 = require("./entities/User.model");
const connectToDb = async () => {
    try {
        await typeorm_1.createConnection({
            type: 'postgres',
            port: +process.env['DB_PORT'],
            username: process.env['DB_USERNAME'] + '',
            database: process.env['DB_USERNAME'] + '',
            password: process.env['DB_PASSWORD'] + '',
            host: process.env['DB_HOSTNAME'] + '',
            entities: [
                User_model_1.Word
            ],
            synchronize: true,
            logging: false,
            keepConnectionAlive: true
        });
    }
    catch (err) {
        console.log(err.message);
    }
};
exports.connectToDb = connectToDb;
const TryDbConnect = async (cb) => {
    try {
        await exports.connectToDb();
        cb();
    }
    catch (e) {
        console.error('TryDbConnect err');
    }
};
exports.TryDbConnect = TryDbConnect;
