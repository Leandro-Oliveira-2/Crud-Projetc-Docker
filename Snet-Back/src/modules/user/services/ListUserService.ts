import Types from "@common/container/types";
import { inject, injectable } from "inversify";
import * as Z from 'zod';


import IUserRepository from "../repositories/IUserRepository";
import IResponse from '@modules/user/responses/IListUserResponse'


@injectable()
class ListUserService {


  @inject(Types.UserRepository) private userRepository!: IUserRepository;

  public async execute(): Promise<IResponse[] | undefined> {
    const users = await this.userRepository.list({});

    return users
  }
}

export default ListUserService;
