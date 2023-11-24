import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import { StatusCodes } from "http-status-codes";
import AppError from "@common/errors/AppError";
import parseZodValidationError from "@common/errors/ZodError";
import AppContainer from '@common/container';

import CreateUserValidator from '@modules/user/infra/http/validators/CreateUserValidator'
import UpdateUserValidator from '@modules/user/infra/http/validators/UpdateUserValidator'
import FilterUserValidator from '@modules/user/infra/http/validators/FilterUserValidator'

import CreateUserService from "@modules/user/services/CreateUserService";
import FindUserService from "@modules/user/services/FindUserService";
import DeleteUserService from "@modules/user/services/DeleteUserService";
import ListUserService from "@modules/user/services/ListUserService";
import UpdateUserService from "@modules/user/services/UpdateUserService";
import FilterUserService from "@modules/user/services/FilterUserService";
import WeeklyBalanceHistoryService from "@modules/WeeklyBalanceHistory/WeeklyBalanceHistoryService ";


class UserController {

  public async create(req: Request, res: Response): Promise<Response> {
    const data = await CreateUserValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(parseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });
    const createUser = AppContainer.resolve<CreateUserService>(CreateUserService);
    const user = await createUser.execute({ data });

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

    if (!req.auth.id) {
      throw new AppError("Not have Permission", 403);
    }
    const id = +req.params.id;
    const findUser = AppContainer.resolve<FindUserService>(FindUserService);
    const user = await findUser.execute({ id })
    return res.status(200).json(instanceToPlain(user));
  }

  public async filter(req:Request, res:Response): Promise<Response> {
    if (!req.auth.id) {
      throw new AppError("Not have Permission", 403);
    }
    const data = await FilterUserValidator.parseAsync(req.query).catch((err) => {
      throw new AppError(parseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });
    
    const filterUsers = AppContainer.resolve<FilterUserService>(FilterUserService);
    const user = await filterUsers.execute({ data });

    return res.status(200).json(user);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    if (!req.auth.id) {
      throw new AppError("Not have Permission", 403);
    }
    const listUser = AppContainer.resolve<ListUserService>(ListUserService);
    const users = await listUser.execute();

    return res.status(200).json(instanceToPlain(users));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    if (!req.auth.id) {
      throw new AppError("Not have Permission", 403);
    }

    const data = await UpdateUserValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(parseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });
    const userId = +req.params.userId;
    const updateUser = AppContainer.resolve<UpdateUserService>(UpdateUserService);
    await updateUser.execute({ userId, data });

    return res.status(StatusCodes.NO_CONTENT).json();
  }

  public async WeeklyBalanceHistory(req: Request, res: Response): Promise<Response> {

    const WeeklyBalanceHistory = AppContainer.resolve<WeeklyBalanceHistoryService>(WeeklyBalanceHistoryService);
    await WeeklyBalanceHistory.execute({});

    return res.status(StatusCodes.NO_CONTENT).json();
  }

}

export default UserController