import { getRepository } from 'typeorm';
import { Router } from 'express';
import { Todo, TodoComment } from '../../entities';

const router = Router();

router.route('/').get(async (req, res) => {
  try {
    const todoRepo = getRepository(Todo);
    const todos = await todoRepo.find({ relations: ['comments'] });
    res.status(200).send(todos);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route('/').post(async (req, res) => {
  const dto: Todo = req.body;

  try {
    const todoRepo = getRepository(Todo);
    const newTodo = todoRepo.create(dto);
    await todoRepo.save(newTodo);

    res.status(201).send('created');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route('/').put(async (req, res) => {
  const dto: Todo = req.body;
  const { id, importance, title, description, finished } = dto;
  const toUpdate = { id, importance, title, description, finished };
  try {
    const todoRepo = getRepository(Todo);
    await todoRepo.update(id, toUpdate);

    res.status(201).send('updated');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route('/comments').post(async (req, res) => {
  const dto: TodoComment = req.body;
  try {
    const commentRepo = getRepository(TodoComment);

    const newComment = commentRepo.create(dto);

    await commentRepo.save(newComment);
    res.status(201).send('created');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route('/comments').put(async (req, res) => {
  const dto: TodoComment = req.body;
  try {
    const commentRepo = getRepository(TodoComment);
    await commentRepo.update(dto.id, dto);
    res.status(201).send('updated');
  } catch (err) {
    res.status(500).send('updated');
  }
});

router.route('/:todoId').delete(async (req, res) => {
  const id = +req.params['todoId'];

  try {
    const todoRepo = getRepository(Todo);
    const todo = await todoRepo.findOneOrFail({ id });
    await todoRepo.delete(todo);
    res.status(200).send('deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route('/comments/:commentId').delete(async (req, res) => {
  const id = +req.params['commentId'];

  try {
    const commentRepo = getRepository(TodoComment);
    await commentRepo.delete(id);
    res.status(200).send('deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

export const todoRouter = router;
