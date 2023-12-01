import Types from "@common/container/types";
import { inject, injectable } from "inversify";
import * as Z from 'zod';

import Schema from '@modules/userExtract/infra/http/validators/CreateExtractUserValidator';
import IExtractUserRepository from "../repositories/IExtractUserRepository";
import IUserRepository from "@modules/user/repositories/IUserRepository";


interface IRequest {
  userId: number;
  data: Z.infer<typeof Schema>
}

@injectable()
class CreateExtractService {

  @inject(Types.ExtractUserRepository) private ExtractUserRepository!: IExtractUserRepository;

  @inject(Types.UserRepository) private userRepository!: IUserRepository;

  public async execute({ data }: IRequest) {
    
    const alluser = await this.userRepository.list({});
    
    for(const user of alluser){
      const extractUser = {
        userId: user.id,
        dateOfAtualization: new Date(),
        valueOfTheDay: user?.saldo || 0,
      }

       await this.ExtractUserRepository.create(extractUser);
    }
   
    return  this.executeRecursiva(data);/* userExtractCreated */;
  }
  
  public async executeRecursiva(data:any) {
    setTimeout(() => {
      this.execute({userId: data.userId, data});
    }, 60000*60*24);
  }
}

export default CreateExtractService;
