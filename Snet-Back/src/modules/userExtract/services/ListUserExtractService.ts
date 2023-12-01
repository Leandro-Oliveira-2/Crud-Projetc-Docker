import Types from "@common/container/types";
import { inject, injectable } from "inversify";


import IExtractUserRepository from "../repositories/IExtractUserRepository";


import AppError from "@common/errors/AppError";
import { StatusCodes } from "http-status-codes";

interface IRequest {
    userId: number
}

@injectable()
class ListUserExtractService {

    @inject(Types.ExtractUserRepository) private extractUserRepository!: IExtractUserRepository;

    public async execute({ userId }: IRequest) {
      const saldoExtract = await this.extractUserRepository.list({ userId });
      if (!saldoExtract || saldoExtract.length === 0) {
        throw new AppError("Could not find user", 404);
      }
      return saldoExtract;
    }
    
      
}

export default ListUserExtractService;