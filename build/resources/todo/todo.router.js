"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const typeorm_1 = require("typeorm");
const express_1 = require("express");
const entities_1 = require("../../entities");
const router = (0, express_1.Router)();
router.route('/').get(async (req, res) => {
    try {
        const todoRepo = (0, typeorm_1.getRepository)(entities_1.Todo);
        const todos = await todoRepo.find({ relations: ['comments'] });
        res.status(200).send(todos);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router.route('/').post(async (req, res) => {
    const dto = req.body;
    try {
        const todoRepo = (0, typeorm_1.getRepository)(entities_1.Todo);
        const newTodo = todoRepo.create(dto);
        await todoRepo.save(newTodo);
        res.status(201).send('created');
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router.route('/').put(async (req, res) => {
    const dto = req.body;
    try {
        const todoRepo = (0, typeorm_1.getRepository)(entities_1.Todo);
        await todoRepo.update(dto.id, dto);
        res.status(201).send('updated');
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router.route('/comments').post(async (req, res) => {
    const dto = req.body;
    try {
        const commentRepo = (0, typeorm_1.getRepository)(entities_1.TodoComment);
        const todoRepo = (0, typeorm_1.getRepository)(entities_1.Todo);
        const newComment = commentRepo.create(dto);
        const todo = await todoRepo.findOne({ id: dto.todo.id });
        todo.comments.push(newComment);
        await todoRepo.update(todo.id, todo);
        await commentRepo.save(newComment);
        res.status(201).send('created');
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router.route('/comments').put(async (req, res) => {
    const dto = req.body;
    try {
        const commentRepo = (0, typeorm_1.getRepository)(entities_1.TodoComment);
        await commentRepo.update(dto.id, dto);
    }
    catch (err) {
        res.status(500).send('updated');
    }
});
router.route('/:todoId').delete(async (req, res) => {
    const id = +req.params['todoId'];
    try {
        const todoRepo = (0, typeorm_1.getRepository)(entities_1.Todo);
        await todoRepo.delete(id);
        res.status(200).send('deleted');
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router.route('/comments/:commentId').delete(async (req, res) => {
    const id = +req.params['commentId'];
    try {
        const commentRepo = (0, typeorm_1.getRepository)(entities_1.TodoComment);
        await commentRepo.delete(id);
        res.status(200).send('deleted');
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.todoRouter = router;
