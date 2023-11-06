import Types from "@common/container/types";
import { inject, injectable } from "inversify";

import IUserRepository from "@modules/user/repositories/IUserRepository";
import IResponse from '@modules/user/responses/IListUserResponse'
import AppError from "@common/errors/AppError";

interface IRequest {
  id: number
}


@injectable()
class GetTransactionsUserService {

  @inject(Types.UserRepository) private userRepository!: IUserRepository;


  public async execute({ id }: IRequest): Promise<IResponse | undefined> {

    const transations = await this.userRepository.find({ id }, ['transations', 'receivedTransfers', 'transations.recepter', 'receivedTransfers.user']);

    if (!transations) {
      throw new AppError("Could not find transations", 404);
    }
    return transations
  }
}
export default GetTransactionsUserService

