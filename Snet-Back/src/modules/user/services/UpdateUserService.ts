import Types from "@common/container/types";
import { inject, injectable } from "inversify";
import * as Z from 'zod';


import Schema from '@modules/user/infra/http/validators/UpdateUserValidator';
import IUserRepository from "../repositories/IUserRepository";


import AppError from "@common/errors/AppError";

interface IRequest {
  userId: number,
  data: Z.infer<typeof Schema>,
}

@injectable()
class UpdateUserService {

  @inject(Types.UserRepository) private userRepository!: IUserRepository;

  public async execute({ userId, data }: IRequest) {
  

    const user = await this.userRepository.find({ id: userId });
    if (!user) {
      throw new AppError("Could not find user", 404);
    }

    if (data.fidelidade) {
      // Atualize o objeto "fidelidade" no usuário
        data.fidelidade.data = new Date();
    }

    return this.userRepository.update(user, data);
  }
}

export default UpdateUserService;