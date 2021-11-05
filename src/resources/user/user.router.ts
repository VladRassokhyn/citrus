import { userService } from './user.service';
import { checkJwt, checkRole, isAdminUser } from '../../meddleware';
import express, { Request, Response } from 'express';

const router = express.Router();

router
  .route('/')
  .get([checkJwt, isAdminUser], async (req: Request, res: Response) => {
    const tt = String(req.query['tt']);
    const isAdmin = res.locals['isAdminUser'];
    try {
      const users = await userService.getAllUsers(isAdmin, tt);
      res.status(200).send(users);
    } catch (err) {
      res.status(500);
    }
  });

router.route('/:id').get(async (req: Request, res: Response) => {
  const id = Number(req.params['id']);

  try {
    const user = await userService.getUserById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send('User not found');
  }
});

router
  .route('/')
  .post(
    [checkJwt, checkRole(['ADMIN', 'MANAGER'])],
    async (req: Request, res: Response) => {
      try {
        await userService.createNewUser(req.body);
        res.status(201).send('User created');
      } catch (err) {
        res.status(409).send(err);
      }
    },
  );

router.route('/:id').put([checkJwt], async (req: Request, res: Response) => {
  const id = Number(req.params['id']);

  try {
    await userService.updateUser(req.body, id);
    res.status(204);
  } catch (e) {
    res.status(500);
    return;
  }
});

router
  .route('/:id')
  .delete(
    [checkJwt, checkRole(['ADMIN', 'MANAGER'])],
    async (req: Request, res: Response) => {
      const id = Number(req.params['id']);

      try {
        await userService.deleteUser(id);
        res.status(204).send();
      } catch (err) {
        res.status(500);
      }
    },
  );

export const userRouter = router;
