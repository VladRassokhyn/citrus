import { getRepository } from 'typeorm';
import { Category, Checklist, Field } from '../../entities';

const getChecklists = async () => {
  const checklistRepo = getRepository(Checklist);
  return await checklistRepo.find({
    relations: ['categories', 'categories.fields'],
  });
};

const createNewChecklist = async (dto: Checklist) => {
  const checklistRepo = getRepository(Checklist);
  const categoryRepo = getRepository(Category);
  const fieldRepo = getRepository(Field);

  const newChecklist = checklistRepo.create({ ...dto });

  const checklist = await checklistRepo.save(newChecklist);
  const categories: Category[] = [];

  dto.categories.forEach(async (category) => {
    const newCategory = categoryRepo.create({ ...category, checklist });
    categories.push(newCategory);
  });

  const savedCategories = await categoryRepo.save(categories);
  const fields: Field[] = [];

  savedCategories.forEach((category) => {
    category.fields.forEach((field) => {
      const newField = fieldRepo.create({ ...field, category });
      fields.push(newField);
    });
  });

  await fieldRepo.save(fields);

  return checklist.id;
};

const getChecklistById = async (id: number) => {
  const checklistRepo = getRepository(Checklist);
  return await checklistRepo.findOneOrFail(
    { id },
    { relations: ['categories', 'categories.fields'] },
  );
};

const deleteChecklist = async (id: number) => {
  const checklistRepo = getRepository(Checklist);

  await checklistRepo.delete(id);
};

export const checklistsRepo = {
  getChecklists,
  createNewChecklist,
  getChecklistById,
  deleteChecklist,
};
