import { getConnection } from 'typeorm';
import { injectable } from 'inversify';

import UserExtract from '@modules/userExtract/infra/typeorm/entities/UserExtract';
import IExtractUserRepository from '@modules/userExtract/repositories/IExtractUserRepository';

import ICreateUserExtractDTO from '@modules/userExtract/dtos/ICreateUserExtractDTO';


@injectable()
class ExtractUserRepository implements IExtractUserRepository {
  private ormRepository = getConnection().getRepository(UserExtract);

  public async create(data: ICreateUserExtractDTO): Promise<UserExtract> {
    const extract = this.ormRepository.create(data);
    return this.ormRepository.save(extract);
  }
  
  public async find(where: object | object[], relations?: string[]): Promise<UserExtract | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<UserExtract[]> {
    return this.ormRepository.find({
      where, relations, take, skip,
    });
  }
  
  

  public async delete(userId: number): Promise<void> {
    this.ormRepository.delete(userId);
  }
}

export default ExtractUserRepository;
