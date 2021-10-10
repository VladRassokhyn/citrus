import { Salesman } from '../entities';
import { salesmanRepo } from '../reposytorys';

const getAllSalesmans = () => salesmanRepo.getAllSalesmans();

const addSalesman = (dto: Salesman) => salesmanRepo.addSalesman(dto);

export { getAllSalesmans, addSalesman };
