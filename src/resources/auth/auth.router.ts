import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entities';
import { checkJwt } from '../../meddleware';
import { validate } from 'class-validator';

const router = express.Router();

router.route('/').get(async (req: Request, res: Response) => {
  const token = <string>req.headers['auth'];

  try {
    const jwtPayload = <any>jwt.verify(token, process.env['jwtSecret']!);
    const usersRepo = getRepository(User);
    const user = await usersRepo.findOne({
      where: { id: jwtPayload.userId },
      select: ['id', 'username', 'role', 'name', 'lastName', 'shop'],
      relations: ['shop'],
    });
    res.status(200).send(user);
  } catch (err) {
    res.status(401).send(err);
    console.log(err);
    return;
  }
});

router.route('/login').post(async (req: Request, res: Response) => {
  let { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).send();
  }
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail({ where: { username } });

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env['jwtSecret']!,
      { expiresIn: '744h' },
    );

    res.send({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    res.status(401).send(err);
  }
});

router
  .route('/change-password')
  .post([checkJwt], async (req: Request, res: Response) => {
    const id = res.locals['jwtPayload'].userId;

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    const userRepository = getRepository(User);
    let user = await userRepository.findOneOrFail(id);
    if (!user) {
      res.status(401).send();
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  });

export const authRouter = router;
