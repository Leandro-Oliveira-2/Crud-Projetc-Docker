import Types from "@common/container/types";
import { inject, injectable } from "inversify";
import * as Z from 'zod';

import IUserRepository from "../repositories/IUserRepository";
import IResponse from '@modules/user/responses/IListUserResponse'
import Schema from '@modules/user/infra/http/validators/FilterUserValidator';
import User from "../infra/typeorm/entities/User";

interface IRequest {
  data: Z.infer<typeof Schema>
}

@injectable()
class FilterUserService {

  @inject(Types.UserRepository) private userRepository!: IUserRepository;

  public async execute({ data }: IRequest) : Promise<IResponse[] | undefined>{

    try {
      const usersFound = await this.userRepository.filterByName(data.name? data.name: '');
     

      return usersFound.map(user => {
        return {
          id: user.id,
          name: user.name,
          gender: user.gender,
          email: user.email,
          phone: user.phone,
          address: user.adress, 
          saldo: user.saldo,
          transations: user.transations?.map(transaction => ({
            id: transaction.id,
            userId: transaction.userId,
            date: transaction.date,
            transationType: transaction.transationType,
            description: transaction.description,
            value: transaction.value,
            status: transaction.status
          })) || []
        };
      });
    } catch (error) {
      
      throw new Error("Erro ao filtrar usuários por nome");
    }
  }
}

export default FilterUserService;
