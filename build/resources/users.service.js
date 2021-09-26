"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordsService = void 0;
const users_repository_1 = require("./users.repository");
const path_1 = __importDefault(require("path"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const fs = __importStar(require("fs"));
const getAll = () => users_repository_1.usersRepo.getAll();
const postWord = async (dto) => users_repository_1.usersRepo.postWord(dto);
const deleteWord = (id) => users_repository_1.usersRepo.deleteWord(id);
const updateWord = (dto) => users_repository_1.usersRepo.updateWord(dto);
const getPages = async (page) => {
    const bookPath = path_1.default.join(__dirname, "../../static/book.pdf");
    const dataBuffer = fs.readFileSync(bookPath);
    let text = '';
    const { numpages } = await pdf_parse_1.default(dataBuffer, {
        pagerender: pageData => {
            if (pageData.pageIndex === page) {
                pageData.getTextContent().then((data) => {
                    console.log(data);
                    text = data.items.map((item, i) => {
                        if (i !== 0 && i !== 1)
                            return item.str;
                    }).join(',');
                });
            }
            return '';
        }
    });
    return { text, numpages };
};
exports.wordsService = { postWord, deleteWord, getAll, updateWord, getPages };
