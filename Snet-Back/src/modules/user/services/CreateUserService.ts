  import Types from "@common/container/types";
  import { inject, injectable } from "inversify";
  import * as Z from 'zod';
  import * as argon2 from 'argon2';

  import Schema from '@modules/user/infra/http/validators/CreateUserValidator';
  import IUserRepository from "../repositories/IUserRepository";


  interface IRequest {
    data: Z.infer<typeof Schema>
  }

  @injectable()
  class CreateUserService {

    @inject(Types.UserRepository) private userRepository!: IUserRepository;

    public async execute({ data }: IRequest) {
      
    
      const user = {
        name: data.name,
        gender: data.gender.toString(),
        email: data.email,
        phone: data.phone,
        adress: data.adress,
        saldo: data.saldo,
        fidelidade: {
          dia: data.fidelidade.dia,
          data: new Date(),
          quantityRewards: data.fidelidade.quantityRewards || 0,
          rewardDates: data.fidelidade.rewardDates || [],
        },
        enabled : true,
        passwordHash: await argon2.hash(data.secret)
      }
      const userCreated = await this.userRepository.create(user);

      return userCreated;
    }
  }

  export default CreateUserService;
