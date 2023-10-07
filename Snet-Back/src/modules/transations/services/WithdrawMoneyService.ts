import Types from "@common/container/types";
import { inject, injectable } from "inversify";
import * as Z from 'zod';
import * as argon2 from 'argon2';

import Schema from '@modules/transations/infra/http/validators/CreateTransationValidators';
import ITransationRepository from '@modules/transations/repositories/ITransationRepository';


import AppError from "@common/errors/AppError";
import { StatusCodes } from "http-status-codes";
import IUserRepository from "@modules/user/repositories/IUserRepository";
import app from "@common/infra/http/app";

interface IRequest {
  data: Z.infer<typeof Schema>,
}

@injectable()
class WithdrawMoneyService {

  @inject(Types.UserRepository) private userRepository!: IUserRepository;


  @inject(Types.TransationRepository) private transationRepository!: ITransationRepository;

  public async execute({ data }: IRequest) {


    const transationDate = new Date();
    const user = await this.userRepository.find({ id: data.userId });

    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    if (user.saldo !== undefined && user.saldo < data.value) {
      throw new AppError("Value is Insufficient", StatusCodes.FORBIDDEN)
    }



    const userAlter = {
      saldo: user.saldo !== undefined ? user.saldo - data.value : 0
    }

    await this.userRepository.update(user, userAlter);
    const transation = {
      userId: data.userId,
      date: transationDate,
      transationType: data.transationType,
      description: data.description,
      value: parseFloat(data.value.toString()), // Convertendo para número decimal
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

export default WithdrawMoneyService;
