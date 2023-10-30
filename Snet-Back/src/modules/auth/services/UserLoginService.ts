import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import * as Z from 'zod';

import SecurityConfig from '@config/SecurityConfig';
import AppError from '@common/errors/AppError';
import Types from '@common/container/types';

import LoginValidator from '@modules/auth/infra/http/validators/UserLoginValidator';
import IResponse from '@modules/auth/responses/IUserLoginResponse';
import IUserRepository from '@modules/user/repositories/IUserRepository';
interface IRequest {
  data: Z.infer<typeof LoginValidator>;
}
@injectable()
class LoginService {
  @inject(Types.UserRepository) private userRepository!: IUserRepository;

  public async execute({ data }: IRequest): Promise<IResponse> {

    let user = await this.userRepository.find({ email: data.email});
  
    if(!user) throw new AppError('Could not find user', 404);

    if (user.passwordHash && !await argon2.verify(user.passwordHash, data.password)) {
      throw new AppError('Password incorrect', 401);
    }

    const accessToken = jwt.sign({ userId: user.id }, SecurityConfig.jwt.key, {
      expiresIn: SecurityConfig.jwt.exp,
    });

    const refreshToken = jwt.sign({ userId: user.id }, SecurityConfig.jwt.keyRefresh, {
      expiresIn: SecurityConfig.jwt.refreshExp,
    });

    return {
      accessToken,
      accessTokenExpireIn: SecurityConfig.jwt.exp,
      refreshToken,
      refreshTokenExpireIn: SecurityConfig.jwt.refreshExp,
      user: {
        id: user.id,
        fullname: user.name,
        email: user.email,
        saldo: user.saldo,
        gender: user.gender,
        phone: user.phone,
        adress: user.adress,
        fidelidade: user.fidelidade
      },
    };
  }
}

export default LoginService;
