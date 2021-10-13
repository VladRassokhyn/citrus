import { Salesman } from '../entities';
import { salesmanRepo } from '../reposytorys';

const getAllSalesmans = () => salesmanRepo.getAllSalesmans();

const addSalesman = (dto: Salesman) => salesmanRepo.addSalesman(dto);

const removeSalesman = (salesmanId: string) =>
  salesmanRepo.removeSalesman(salesmanId);

const updateSalesman = (dto: Salesman) => salesmanRepo.updateSalesman(dto);

export { getAllSalesmans, addSalesman, removeSalesman, updateSalesman };
