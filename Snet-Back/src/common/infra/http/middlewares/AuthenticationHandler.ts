import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@common/errors/AppError';
import Types from '@common/container/types';
import Container from '@common/container';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import Config from '../../../../config/SecurityConfig';

interface IDecodedParams {
  userId?: number;
}

const publicKey = Config.jwt.key

const AuthMiddleware = {

  required: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const UserRepository = Container.get<IUserRepository>(Types.UserRepository);

    if (!req.headers.authorization) {
      throw new AppError('Missing authorization header', 401);
    }

    const authHeader = req.headers.authorization;
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      throw new AppError('Authentication method not supported', 401);
    }

    try {
      const decoded = <IDecodedParams><unknown>verify(token, publicKey);
      const user = await UserRepository.find({id:decoded.userId})
      if(!user){
        throw new AppError('Token is incorrect', 401);
      }
      req.auth = {id: decoded.userId}
      return next();
    } catch (err) {
      throw new AppError('Token is incorrect', 401);
    }
  },
};

export default AuthMiddleware;