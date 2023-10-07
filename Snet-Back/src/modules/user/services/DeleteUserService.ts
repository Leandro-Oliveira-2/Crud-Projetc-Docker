import Types from "@common/container/types";
import { inject, injectable } from "inversify";
import IUserRepository from "../repositories/IUserRepository";


import AppError from "@common/errors/AppError";

interface IRequest {
    id: number
}

@injectable()
class DeleteUserService {

    @inject(Types.UserRepository) private userRepository!: IUserRepository;

    public async execute(id: number) {

        const user = await this.userRepository.find({ id });
        if (!user) {
            throw new AppError("Could not find user", 404);
        }
        return await this.userRepository.delete(id);
    }
}

export default DeleteUserService;