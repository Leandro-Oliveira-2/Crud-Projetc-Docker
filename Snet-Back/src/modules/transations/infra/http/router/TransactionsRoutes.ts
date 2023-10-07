import { Router } from 'express';
import TransationController from '@modules/transations/infra/http/controllers/TransationController';
import AuthMiddleware from '@common/infra/http/middlewares/AuthenticationHandler';

const transationRouter = Router();
const transationController = new TransationController();

transationRouter.post('/', [AuthMiddleware.required],transationController.create);
transationRouter.delete('/:id', [AuthMiddleware.required],transationController.delete);
transationRouter.get('/', [AuthMiddleware.required],transationController.list);
transationRouter.post('/deposit', [AuthMiddleware.required],transationController.deposit);
transationRouter.post('/saque', [AuthMiddleware.required],transationController.saque);
transationRouter.get('/list/:id', [AuthMiddleware.required],transationController.userTransations);
transationRouter.get('/list', [AuthMiddleware.required],transationController.list);
transationRouter.post('/filterByName',[AuthMiddleware.required],transationController.filter);

export default transationRouter;
