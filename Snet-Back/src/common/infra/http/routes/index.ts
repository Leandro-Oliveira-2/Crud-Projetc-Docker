import {  Router } from 'express';
import 'dotenv/config';

import UserRoutes from '@modules/user/infra/http/routes/UserRouter';
import authRouter from '@modules/auth/infra/http/routes/AuthRoutes';
import TransationsRoutes from '@modules/transations/infra/http/router/TransactionsRoutes'

const routes = Router();

routes.use('/auth', authRouter);

routes.use('/users', UserRoutes);

routes.use('/transations', TransationsRoutes );


export default routes;
