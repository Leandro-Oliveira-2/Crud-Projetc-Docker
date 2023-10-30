import Types from "@common/container/types";
import { inject, injectable } from "inversify";
import * as Z from 'zod';

import Schema from '@modules/transations/infra/http/validators/TransferUserValirdator';
import ITransationRepository from '@modules/transations/repositories/ITransationRepository';


import AppError from "@common/errors/AppError";
import { StatusCodes } from "http-status-codes";
import IUserRepository from "@modules/user/repositories/IUserRepository";

interface IRequest {
    data: Z.infer<typeof Schema>,
}

@injectable()
class TransferUserService {

    @inject(Types.UserRepository) private userRepository!: IUserRepository;


    @inject(Types.TransationRepository) private transationRepository!: ITransationRepository;

    public async execute({ data }: IRequest) {

        if (data.userGetId === data.userPutId) {
            throw new AppError("You cannot transfer funds to yourself.");
        }
        
        const transationDate = new Date();
        const userPut = await this.userRepository.find({ id: data.userPutId });
        const userget = await this.userRepository.find({ id: data.userGetId });

        if (!userPut) {
            throw new AppError("User not found", StatusCodes.NOT_FOUND);
        }

        if (!userget) {
            throw new AppError("User not found", StatusCodes.NOT_FOUND);
        }
        

        if (userPut.saldo !== undefined && userPut.saldo < data.value) {
            throw new AppError("Value is Insufficient", StatusCodes.FORBIDDEN)
        }

        const userPutAlter = {
            saldo: userPut.saldo !== undefined ? userPut.saldo - data.value : 0
          }
          
          const useGetAlter = {
            saldo: userget.saldo !== undefined ? userget.saldo + data.value : 0
          }

        await this.userRepository.update(userPut, userPutAlter);
        await this.userRepository.update(userget, useGetAlter);
        const transationPut = {
            userId: data.userPutId,
            recepterId: data.userGetId,
            date: transationDate,
            transationType: "Transferência",
            description: data.description,
            value: parseFloat(data.value.toString()), // Convertendo para número decimal
            status: "CONCLUÍDO"
        }
        const transatioPutCreated = await this.transationRepository.create(transationPut);

        return {
            id: transatioPutCreated.id,
            type: transatioPutCreated.transationType,
            value: transatioPutCreated.value,
            saldoAtual: userPut.saldo
        };
    }
}

export default TransferUserService;
