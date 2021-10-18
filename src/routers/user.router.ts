import { checkJwt, checkRole } from './../meddleware';
import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities';
import { validate } from 'class-validator';

const router = express.Router();

router.route('/').get(async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find({
    select: ['id', 'username', 'role'],
  });

  res.send(users);
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const id = req.params['id'];

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOneOrFail(id, {
      select: ['id', 'username', 'role'],
    });
    res.send(user);
  } catch (error) {
    res.status(404).send('User not found');
  }
});

router.route('/').post(
  //[checkJwt, checkRole(['ADMIN'])],
  async (req: Request, res: Response) => {
    const { username, password, role, name, lastName } = req.body;
    const user = new User();
    user.username = username;
    user.password = password;
    user.name = name;
    user.lastName = lastName;
    user.role = role;

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    user.hashPassword();

    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send(e);
      return;
    }

    res.status(201).send('User created');
  },
);

router
  .route('/:id')
  .put(
    [checkJwt, checkRole(['ADMIN'])],
    async (req: Request, res: Response) => {
      const id = req.params['id'];

      const { username, role } = req.body;

      const userRepository = getRepository(User);
      let user;
      try {
        user = await userRepository.findOneOrFail(id);
      } catch (error) {
        res.status(404).send('User not found');
        return;
      }

      user.username = username;
      user.role = role;
      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }

      try {
        await userRepository.save(user);
      } catch (e) {
        res.status(409).send('username already in use');
        return;
      }

      res.status(204).send();
    },
  );

router
  .route('/:id')
  .delete(
    [checkJwt, checkRole(['ADMIN'])],
    async (req: Request, res: Response) => {
      const id = req.params['id']!;

      const userRepository = getRepository(User);
      let user: User;
      try {
        user = await userRepository.findOneOrFail(id);
      } catch (error) {
        res.status(404).send('User not found');
        return;
      }
      userRepository.delete(id);

      res.status(204).send();
    },
  );

export const userRouter = router;
