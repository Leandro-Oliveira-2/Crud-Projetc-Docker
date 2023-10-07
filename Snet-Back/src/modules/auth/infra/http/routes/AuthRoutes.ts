import { Router } from 'express';
import AuthController from '@modules/auth/infra/http/controllers/AuthController';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/', authController.login);

export default authRouter;
