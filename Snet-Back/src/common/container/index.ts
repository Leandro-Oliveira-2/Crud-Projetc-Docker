import { Container } from 'inversify';

import Types from '@common/container/types';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import ITransationRepository from '@modules/transations/repositories/ITransationRepository';
import TransationRepository from '@modules/transations/infra/typeorm/repositories/TransationRepository';
import IExtractUserRepository from '@modules/userExtract/repositories/IExtractUserRepository';
import ExtractUserRepository from '@modules/userExtract/infra/typeorm/repositories/ExtractUserRepository';


const container = new Container();

container.bind<IUserRepository>(Types.UserRepository).to(UserRepository);
container.bind<ITransationRepository>(Types.TransationRepository).to(TransationRepository);
container.bind<IExtractUserRepository>(Types.ExtractUserRepository).to(ExtractUserRepository);

export default container;
