import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import { StatusCodes } from "http-status-codes";
import AppError from "@common/errors/AppError";
import parseZodValidationError from "@common/errors/ZodError";
import AppContainer from '@common/container';

import CreateExtractUserValidator from '@modules/userExtract/infra/http/validators/CreateExtractUserValidator'

import CreateUserService from "@modules/user/services/CreateUserService";
import FindUserService from "@modules/user/services/FindUserService";
import DeleteUserService from "@modules/user/services/DeleteUserService";
import ListUserService from "@modules/user/services/ListUserService";
import CreateExtractService from "@modules/userExtract/services/CreateExtractService";
import ListExtractService from "@modules/userExtract/services/ListExtractService";
import ListUserExtractService from "@modules/userExtract/services/ListUserExtractService";


class UserExtractController {

  public async create(req: Request, res: Response): Promise<Response> {
    const data = await CreateExtractUserValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(parseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });
  
    const createExtractUser = AppContainer.resolve<CreateExtractService>(CreateExtractService);
    const user = await createExtractUser.execute({ userId: data.userId, data });
  
    return res.status(StatusCodes.CREATED).json(instanceToPlain(user));
  }
  

  public async delete(req: Request, res: Response): Promise<Response> {
    if (!req.auth.id) {
      throw new AppError("Not have Permission", 403);
    }
    const id = +req.params.id;
    const deleteUser = AppContainer.resolve<DeleteUserService>(DeleteUserService);
    await deleteUser.execute(id)
    return res.status(StatusCodes.NO_CONTENT).json();
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const userId = +req.params.userId;
    const findExtract = AppContainer.resolve<ListUserExtractService>(ListUserExtractService);
    const extract = await findExtract.execute({ userId });
    return res.status(200).json(instanceToPlain(extract));
  }
  

  public async list(req: Request, res: Response): Promise<Response> {

    const listExtracts = AppContainer.resolve<ListExtractService>(ListExtractService);
    const extracts = await listExtracts.execute();

    return res.status(200).json(instanceToPlain(extracts));
  }


}

export default UserExtractController