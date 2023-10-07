import Types from "@common/container/types";
import { inject, injectable } from "inversify";
import * as Z from 'zod';

import Schema from '@modules/transations/infra/http/validators/CreateTransationValidators';
import ITransationRepository from '@modules/transations/repositories/ITransationRepository';


import AppError from "@common/errors/AppError";
import { StatusCodes } from "http-status-codes";
import IUserRepository from "@modules/user/repositories/IUserRepository";

interface IRequest {
  data: Z.infer<typeof Schema>,
}

@injectable()
class DepositService {

  @inject(Types.UserRepository) private userRepository!: IUserRepository;


  @inject(Types.TransationRepository) private transationRepository!: ITransationRepository;

  public async execute({ data }: IRequest) {


    const transationDate = new Date();
    const user = await this.userRepository.find({ id: data.userId });

    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }


    const novoSaldo = (user.saldo || 0) + data.value;
    console.log(data.value);
    if (novoSaldo < 0) {
      throw new AppError("Value is Insuficient", StatusCodes.FORBIDDEN)
    }
    const userAlter = {
      saldo: novoSaldo
    }
    await this.userRepository.update(user, userAlter);
    const transation = {
      userId: data.userId,
      date: transationDate,
      transationType: data.transationType,
      description: data.description,
      value: data.value,
      status: "CONCLUÍDO"
    }
    const transationCreated = await this.transationRepository.create(transation);

    return {
      id: transationCreated.id,
      type: transationCreated.transationType,
      value: transationCreated.value,
      saldoAtual: user.saldo
    };
  }
}

export default DepositService;
