import UserExtract from "@modules/userExtract/infra/typeorm/entities/UserExtract";

import ICreateUserExtractDTO from "@modules/userExtract/dtos/ICreateUserExtractDTO";


interface IExtractUserRepository{
  create(data:ICreateUserExtractDTO): Promise<UserExtract>;
  find(where: object | object[], relations?: string[]): Promise<UserExtract | undefined>;
  list(where: object | object[], relations?: string[], take?: number, skip?: number): Promise<UserExtract[]>;
  delete(userId:number): Promise<void>;
}
export default IExtractUserRepository;
