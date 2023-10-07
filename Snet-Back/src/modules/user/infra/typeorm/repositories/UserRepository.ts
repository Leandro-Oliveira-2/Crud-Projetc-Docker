import { getConnection } from 'typeorm';
import { injectable } from 'inversify';

import User from '@modules/user/infra/typeorm/entities/User';
import IUserRepository from '@modules/user/repositories/IUserRepository';

import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/user/dtos/IUpdateUserDTO';

@injectable()
class UserRepository implements IUserRepository {
  private ormRepository = getConnection().getRepository(User);

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    return this.ormRepository.save(user);
  }
  
  public async find(where: object | object[], relations?: string[]): Promise<User | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<User[]> {
    return this.ormRepository.find({
      where, relations, take, skip,
    });
  }

  public async update(user: User, data: IUpdateUserDTO ): Promise<User> {
    this.ormRepository.merge(user, data);
    return this.ormRepository.save(user);
  }

  filterByName(name: String): Promise<User[]>{
    return this.ormRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.transations', 'transations')
      .where('user.name LIKE :name', { name: `%${name}%` })
      .getMany();
  }

  public async delete(userId: number): Promise<void> {
    this.ormRepository.delete(userId);
  }
}

export default UserRepository;
