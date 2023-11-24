import { Router } from 'express';
import UserController from '@modules/user/infra/http/controllers/UserController';
import AuthMiddleware from '@common/infra/http/middlewares/AuthenticationHandler';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.create);
userRouter.get('/:id', [AuthMiddleware.required], userController.find);
userRouter.delete('/:id', [AuthMiddleware.required], userController.delete);
userRouter.get('/', [AuthMiddleware.required], userController.list);
userRouter.patch('/:userId', [AuthMiddleware.required], userController.update);
userRouter.post('/filterByName',  [AuthMiddleware.required],userController.filter);
userRouter.post('/AlterChach', userController.WeeklyBalanceHistory);

export default userRouter;
