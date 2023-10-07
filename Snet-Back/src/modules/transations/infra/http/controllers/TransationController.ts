import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "@common/errors/AppError";
import parseZodValidationError from "@common/errors/ZodError";
import AppContainer from '@common/container';

import CreateTransationValidator from '@modules/transations/infra/http/validators/CreateTransationValidators'
import FilterUserValidator from '@modules/transations/infra/http/validators/FilterTransactionValidator'
import CreateTransationService from "@modules/transations/services/CreateTransationService";
import DeleteUserService from "@modules/user/services/DeleteUserService";
import DepositService from "@modules/transations/services/DepositService";
import WithdrawMoneyService from "@modules/transations/services/WithdrawMoneyService";
import ListTransationService from "@modules/transations/services/ListTransationService";
import GetTransactionsUserService from "@modules/transations/services/GetTransactionsUserService";
import FilterTransationService from "@modules/transations/services/FilterTransationService";


class TransationController {

  public async create(req: Request, res: Response): Promise<Response> {
    if (!req.auth.id) {
      throw new AppError("Not have Permission", 403);
    }

    const data = await CreateTransationValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(parseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });
    const createTransation = AppContainer.resolve<CreateTransationService>(CreateTransationService);
    const transation = await createTransation.execute({ data });

    return res.status(StatusCodes.CREATED).json(transation)
  }

  public async deposit(req: Request, res: Response): Promise<Response> {
    if(!req.auth.id){
      throw new AppError("Not have Permission", 403);
    }


    const data = await CreateTransationValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(parseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });
    const createTransation = AppContainer.resolve<DepositService>(DepositService);
    const transation = await createTransation.execute({ data });

    return res.status(StatusCodes.CREATED).json(transation)
  }

  public async saque(req: Request, res: Response): Promise<Response> {
    if(!req.auth.id){
      throw new AppError("Not have Permission", 403);
    }

    const data = await CreateTransationValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(parseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });
    const createTransation = AppContainer.resolve<WithdrawMoneyService>(WithdrawMoneyService);
    const transation = await createTransation.execute({ data });

    return res.status(StatusCodes.CREATED).json(transation)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    if(!req.auth.id){
      throw new AppError("Not have Permission", 403);
    }

    const id = +req.params.id;
    const deleteUser = AppContainer.resolve<DeleteUserService>(DeleteUserService);
    await deleteUser.execute(id)
    return res.status(StatusCodes.NO_CONTENT).json();
  }


  public async userTransations(req: Request, res: Response): Promise<Response> {
    if(!req.auth.id){
      throw new AppError("Not have Permission", 403);
    }

    try {
      const id = +req.params.id;
      const findUser = AppContainer.resolve<GetTransactionsUserService>(GetTransactionsUserService);
      const user = await findUser.execute({ id })
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }


  public async list(req: Request, res: Response): Promise<Response> {
    if(!req.auth.id){
      throw new AppError("Not have Permission", 403);
    }
    
    const listTransatio = AppContainer.resolve<ListTransationService>(ListTransationService);
    const transations = await listTransatio.execute();

    return res.status(200).json(transations);
  }

  public async filter(req:Request, res:Response): Promise<Response> {
    if (!req.auth.id) {
      throw new AppError("Not have Permission", 403);
    }
    const data = await FilterUserValidator.parseAsync(req.query).catch((err) => {
      throw new AppError(parseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });

    const filterTransations = AppContainer.resolve<FilterTransationService>(FilterTransationService);
    const transations = await filterTransations.execute({ data });

    return res.status(200).json(transations);
  }


}

export default TransationController