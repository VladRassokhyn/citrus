import { Category, Checklist, Field } from './../entities/Checklist.model';
import { getRepository } from 'typeorm';
import express, { Request, Response } from 'express';
import { checkJwt, checkRole } from '../meddleware';

const router = express.Router();

router.route('/').get(async (req, res) => {
  const passedOnly = req.query['passedOnly'];
  const passerId = req.query['passerId'];
  try {
    const checklistRepo = getRepository(Checklist);
    const categoryRepo = getRepository(Category);

    let checklists = await checklistRepo.find({ relations: ['categories'] });
    const categories = await categoryRepo.find({ relations: ['fields'] });

    if (passedOnly === 'true') {
      checklists = checklists.filter((checklist) => checklist.passed);
    } else {
      checklists = checklists.filter((checklist) => !checklist.passed);
    }

    if (passerId) {
      checklists = checklists.filter(
        (checklist) => checklist.passerId === Number(passerId),
      );
    }

    let toRes: Checklist[] = [];

    checklists.forEach((checklist) => {
      const checklistToRes: Checklist = {
        ...checklist,
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
        const dto: Checklist = req.body;
        const checklistRepo = getRepository(Checklist);
        const categoryRepo = getRepository(Category);
        const fieldRepo = getRepository(Field);

        const newChecklist = new Checklist();
        newChecklist.title = dto.title;
        newChecklist.passed = dto.passed;
        newChecklist.mark = dto.mark;
        newChecklist.maxMark = dto.maxMark;
        newChecklist.managerId = dto.managerId;
        newChecklist.creatorId = dto.creatorId;
        newChecklist.passerId = dto.passerId;

        const checklist = await checklistRepo.save(newChecklist);

        dto.categories.forEach(async (category) => {
          const newCategory = new Category();
          newCategory.title = category.title;
          newCategory.checklist = checklist;
          newCategory.fields = category.fields;
          const savedCat = await categoryRepo.save(newCategory);

          let fields: Field[] = [];

          category.fields.forEach((field) => {
            const newField = new Field();
            newField.title = field.title;
            newField.checked = field.checked;
            newField.category = savedCat;
            fields.push(newField);
          });

          await fieldRepo.save(fields);
        });

        res.send();
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    },
  );

router.route('/:id').get(async (req, res) => {
  const id = +req.params['id']!;
  const checklistRepo = getRepository(Checklist);
  const categoryRepo = getRepository(Category);
  try {
    const checklist = await checklistRepo.findOneOrFail(
      { id },
      { relations: ['categories'] },
    );
    const categories = await categoryRepo.find({ relations: ['fields'] });

    const checklistToRes: Checklist = {
      ...checklist,
      categories: [],
    };
    categories.forEach((category) => {
      if (checklist.categories.find((cat) => cat.id === category.id)) {
        checklistToRes.categories.push(category);
      }
    });

    res.status(200).send(checklistToRes);
  } catch (err) {
    res.status(404).send('checklist not found');
  }
});

router
  .route('/:id')
  .delete(
    [checkJwt, checkRole(['ADMIN', 'MANAGER'])],
    async (req: Request, res: Response) => {
      const checklistId = +req.params['id']!;
      const checklistRepo = getRepository(Checklist);
      const categoryRepo = getRepository(Category);
      const fieldRepo = getRepository(Field);

      try {
        let fieldIds: number[] = [];
        let catIds: number[] = [];

        const checklist = await checklistRepo.findOneOrFail(
          { id: checklistId },
          { relations: ['categories'] },
        );

        const categoties = await categoryRepo.find({ relations: ['fields'] });

        checklist.categories.forEach((cat) => {
          catIds.push(cat.id);
        });

        categoties.forEach((cat) => {
          if (catIds.includes(cat.id)) {
            cat.fields.forEach((field) => {
              fieldIds.push(field.id);
            });
          }
        });

        await fieldRepo.delete(fieldIds);
        await categoryRepo.delete(catIds);
        await checklistRepo.delete(checklist.id);

        res.status(200).send('deleted');
      } catch (err) {
        console.log(err);
      }
    },
  );

export const checklistRouter = router;
