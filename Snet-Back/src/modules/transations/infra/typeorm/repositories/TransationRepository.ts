import { getConnection } from 'typeorm';
import { injectable } from 'inversify';

import Transations from "@modules/transations/infra/typeorm/entities/Transations";
import ITransationRepository from '@modules/transations/repositories/ITransationRepository';

import ICreateTransactionsDTO from '@modules/transations/dtos/ICreateTransactionsDTO';


@injectable()
class TransationRepository implements ITransationRepository {
  private ormRepository = getConnection().getRepository(Transations);

  public async create(data: ICreateTransactionsDTO): Promise<Transations> {
    const transation = this.ormRepository.create(data);
    return this.ormRepository.save(transation);
  }

  public async find(where: object | object[], relations?: string[]): Promise<Transations | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async filterByname(name: string): Promise<Transations[]> {
    return this.ormRepository.createQueryBuilder('transactions')
    .leftJoinAndSelect('transactions.user', 'user')
    .where('user.name LIKE :name', { name: `%${name}%` })
    .getMany();
  }

  public async list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<Transations[]> {
    return this.ormRepository.find({
      
      where, relations, take, skip,
    });
  }

  public async delete(transationId: number): Promise<void> {
    this.ormRepository.delete(transationId);
  }
}

export default TransationRepository;
