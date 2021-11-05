import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entities';

export const isAdminUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = res.locals['jwtPayload'].userId;
  const userRepo = getRepository(User);

  const user = await userRepo.findOneOrFail(id);
  res.locals['isAdminUser'] = user.role === 'ADMIN';
  next();
};
