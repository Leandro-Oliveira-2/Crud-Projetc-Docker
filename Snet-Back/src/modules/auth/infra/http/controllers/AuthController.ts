import { Request, Response } from 'express';

import AppError from '@common/errors/AppError';
import AppContainer from '@common/container';

import UserLoginService from '@modules/auth/services/UserLoginService';
import UserLoginValidator from '@modules/auth/infra/http/validators/UserLoginValidator';

class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    const data = await UserLoginValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(`Validation error: ${err.message}`, 400);
    });

    const loginService = AppContainer.resolve<UserLoginService>(UserLoginService);
    const response = await loginService.execute({ data });

    return res.status(200).json(response);
  }
}

export default AuthController;
