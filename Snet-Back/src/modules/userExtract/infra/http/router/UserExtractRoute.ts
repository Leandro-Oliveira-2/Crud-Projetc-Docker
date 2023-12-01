import { Router } from 'express';
import UserExtractController from '@modules/userExtract/infra/http/controllers/UserExtractController';
import AuthMiddleware from '@common/infra/http/middlewares/AuthenticationHandler';

const userExtractRouter = Router();
const userExtractController = new UserExtractController();

userExtractRouter.post('/', userExtractController.create);
userExtractRouter.get('/:userId', userExtractController.find);
userExtractRouter.delete('/:id', userExtractController.delete);
userExtractRouter.post('/list', userExtractController.list);
export default userExtractRouter;
