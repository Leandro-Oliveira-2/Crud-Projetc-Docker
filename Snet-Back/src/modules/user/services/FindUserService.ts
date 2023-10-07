import Types from "@common/container/types";
import { inject, injectable } from "inversify";
import * as Z from 'zod';
import * as argon2 from 'argon2';

import Schema from '@modules/user/infra/http/validators/CreateUserValidator';
import IUserRepository from "../repositories/IUserRepository";


import AppError from "@common/errors/AppError";
import { StatusCodes } from "http-status-codes";

interface IRequest {
    id: number
}

@injectable()
class FindUserService {

    @inject(Types.UserRepository) private userRepository!: IUserRepository;

    public async execute({ id }: IRequest) {

        const user = await this.userRepository.find({ id });
        if (!user) {
            throw new AppError("Could not find user", 404);
        }
        return user;
    }
}

export default FindUserService;