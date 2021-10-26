"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checklistRouter = void 0;
const Checklist_model_1 = require("./../entities/Checklist.model");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const meddleware_1 = require("../meddleware");
const router = express_1.default.Router();
router.route('/').get(async (req, res) => {
    const passedOnly = req.query['passedOnly'];
    try {
        const checklistRepo = (0, typeorm_1.getRepository)(Checklist_model_1.Checklist);
        const categoryRepo = (0, typeorm_1.getRepository)(Checklist_model_1.Category);
        let checklists = await checklistRepo.find({ relations: ['categories'] });
        const categories = await categoryRepo.find({ relations: ['fields'] });
        checklists = checklists.filter((checklist) => checklist.passed === !!passedOnly);
        let toRes = [];
        checklists.forEach((checklist) => {
            const checklistToRes = {
                title: checklist.title,
                id: checklist.id,
                passed: checklist.passed,
                categories: [],
            };
            categories.forEach((category) => {
                if (checklist.categories.find((cat) => cat.id === category.id)) {
                    checklistToRes.categories.push(category);
                }
            });
            toRes.push(checklistToRes);
        });
        res.send(toRes);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router
    .route('/')
    .post([meddleware_1.checkJwt, (0, meddleware_1.checkRole)(['ADMIN', 'MANAGER'])], async (req, res) => {
    try {
        const dto = req.body;
        const checklistRepo = (0, typeorm_1.getRepository)(Checklist_model_1.Checklist);
        const categoryRepo = (0, typeorm_1.getRepository)(Checklist_model_1.Category);
        const fieldRepo = (0, typeorm_1.getRepository)(Checklist_model_1.Field);
        const newChecklist = new Checklist_model_1.Checklist();
        newChecklist.title = req.body.title;
        newChecklist.passed = req.body.passed;
        const checklist = await checklistRepo.save(newChecklist);
        dto.categories.forEach(async (category) => {
            const newCategory = new Checklist_model_1.Category();
            newCategory.title = category.title;
            newCategory.checklist = checklist;
            newCategory.fields = category.fields;
            const cat = await categoryRepo.save(newCategory);
            category.fields.forEach(async (field) => {
                const newField = new Checklist_model_1.Field();
                newField.title = field.title;
                newField.checked = field.checked;
                newField.category = cat;
                await fieldRepo.save(newField);
            });
        });
        res.send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
router.route('/:id').get(async (req, res) => {
    const id = +req.params['id'];
    const checklistRepo = (0, typeorm_1.getRepository)(Checklist_model_1.Checklist);
    const categoryRepo = (0, typeorm_1.getRepository)(Checklist_model_1.Category);
    try {
        const checklist = await checklistRepo.findOneOrFail({ id }, { relations: ['categories'] });
        const categories = await categoryRepo.find({ relations: ['fields'] });
        const checklistToRes = {
            title: checklist.title,
            id: checklist.id,
            passed: checklist.passed,
            categories: [],
        };
        categories.forEach((category) => {
            if (checklist.categories.find((cat) => cat.id === category.id)) {
                checklistToRes.categories.push(category);
            }
        });
        res.status(200).send(checklistToRes);
    }
    catch (err) {
        res.status(404).send('checklist not found');
    }
});
exports.checklistRouter = router;
