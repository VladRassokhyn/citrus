import express, { Request, Response } from 'express';
import { checkJwt, checkRole } from '../../meddleware';
import { checklistService } from './checklist.service';

const router = express.Router();

router.route('/').get(async (req, res) => {
  const passedOnly = req.query['passedOnly'] === 'true';
  const passerId = Number(req.query['passerId']);

  try {
    const checklistsToRes = await checklistService.getChecklists({
      passedOnly,
      passerId,
    });

    res.status(200).send(checklistsToRes);
  } catch (err) {
    res.status(500).send(err);
  }
});

router
  .route('/')
  .post(
    [checkJwt, checkRole(['ADMIN', 'MANAGER'])],
    async (req: Request, res: Response) => {
      try {
        const newChecklistId = await checklistService.createNewChecklist(
          req.body,
        );

        res.status(201).send({ id: newChecklistId });
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    },
  );

router.route('/:id').get(async (req, res) => {
  const id = Number(req.params['id']);
  try {
    const checklist = await checklistService.getChecklistById(id);

    res.status(200).send(checklist);
  } catch (err) {
    res.status(404).send('checklist not found');
  }
});

router
  .route('/:id')
  .delete(
    [checkJwt, checkRole(['ADMIN'])],
    async (req: Request, res: Response) => {
      const deletorId = res.locals['jwtPayload'].userId;
      const checklistId = Number(req.params['id']);

      try {
        await checklistService.deleteChecklist(deletorId, checklistId);
        res.status(200).send('deleted');
      } catch (err) {
        console.log(err);
      }
    },
  );

export const checklistRouter = router;
