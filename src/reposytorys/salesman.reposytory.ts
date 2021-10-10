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

export { getAllSalesmans, addSalesman };
