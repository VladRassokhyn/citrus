import { Category, Checklist, Field } from './../entities/Checklist.model';
import { getRepository } from 'typeorm';
import express, { Request, Response } from 'express';
import { checkJwt, checkRole } from '../meddleware';

const router = express.Router();

router.route('/').get(async (req, res) => {
  const passedOnly = req.query['passedOnly'];
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

    let toRes: Checklist[] = [];

    checklists.forEach((checklist) => {
      const checklistToRes: Checklist = {
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
        newChecklist.title = req.body.title;
        newChecklist.passed = req.body.passed;

        const checklist = await checklistRepo.save(newChecklist);

        dto.categories.forEach(async (category) => {
          const newCategory = new Category();
          newCategory.title = category.title;
          newCategory.checklist = checklist;
          newCategory.fields = category.fields;
          const cat = await categoryRepo.save(newCategory);

          category.fields.forEach(async (field) => {
            const newField = new Field();
            newField.title = field.title;
            newField.checked = field.checked;
            newField.category = cat;
            await fieldRepo.save(newField);
          });
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
  } catch (err) {
    res.status(404).send('checklist not found');
  }
});

export const checklistRouter = router;
