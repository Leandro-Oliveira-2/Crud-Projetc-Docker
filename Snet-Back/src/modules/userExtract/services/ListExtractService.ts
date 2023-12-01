import Types from "@common/container/types";
import { inject, injectable } from "inversify";



import IExtractUserRepository from "../repositories/IExtractUserRepository";
import IResponse from '@modules/userExtract/responses/IListExtracResponse'


@injectable()
class ListExtractService {


  @inject(Types.ExtractUserRepository) private extractUserRepository!: IExtractUserRepository;

  public async execute(): Promise<IResponse[] | undefined> {
    const extractsUsers = await this.extractUserRepository.list({});

    return extractsUsers
  }
}

export default ListExtractService;
