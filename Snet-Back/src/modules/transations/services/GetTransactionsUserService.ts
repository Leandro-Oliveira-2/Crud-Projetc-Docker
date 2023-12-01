import Types from "@common/container/types";
import { inject, injectable } from "inversify";
import IUserRepository from "@modules/user/repositories/IUserRepository";
import IResponse from '@modules/user/responses/IListUserResponse'
import AppError from "@common/errors/AppError";

interface IRequest {
  id: number;
}

@injectable()
class GetTransactionsUserService {

  @inject(Types.UserRepository) private userRepository!: IUserRepository;

  public async execute({ id }: IRequest): Promise<IResponse | undefined> {
    const transactions = await this.userRepository.find({ id }, ['transations', 'receivedTransfers', 'transations.recepter', 'receivedTransfers.user']);

    if (!transactions) {
      throw new AppError("Could not find transactions", 404);
    }

    // Aqui, você pode acessar as transações enviadas e recebidas
    const sentTransfers = transactions.transations || [];
    const receivedTransfers = transactions.receivedTransfers || [];

    // Você pode fazer o que precisa com essas listas
    console.log("Transações enviadas:", sentTransfers);
    console.log("Transações recebidas:", receivedTransfers);

    // Retorne as transações (ou algo mais, dependendo de suas necessidades)
    return transactions;
  }
}

export default GetTransactionsUserService;
