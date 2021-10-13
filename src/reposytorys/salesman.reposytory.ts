import { getRepository } from 'typeorm';
import { Salesman } from '../entities';

const getAllSalesmans = async () => {
  try {
    const repo = getRepository(Salesman);
    return await repo.find();
  } catch (err) {
    console.error('get all salesmans error');
    return err;
  }
};

const addSalesman = async (dto: Salesman) => {
  const repo = getRepository(Salesman);
  const newSalesman = await repo.create(dto);
  return await repo.save(newSalesman);
};

const updateSalesman = async (dto: Salesman) => {
  try {
    const repo = getRepository(Salesman);
    return await repo.update(dto.id, dto);
  } catch (err) {
    return err;
  }
};

const removeSalesman = async (salesmanId: string) => {
  try {
    const repo = getRepository(Salesman);
    const salesman = await repo.find({ id: salesmanId });
    return repo.delete(salesman[0]!);
  } catch (err) {
    return err;
  }
};

export { getAllSalesmans, addSalesman, removeSalesman, updateSalesman };
