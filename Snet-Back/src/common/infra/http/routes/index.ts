import {  Router } from 'express';
import 'dotenv/config';

import UserRoutes from '@modules/user/infra/http/routes/UserRouter';
import authRouter from '@modules/auth/infra/http/routes/AuthRoutes';
import TransationsRoutes from '@modules/transations/infra/http/router/TransactionsRoutes'
import userExtractRouter from '@modules/userExtract/infra/http/router/UserExtractRoute'

const routes = Router();

routes.use('/auth', authRouter);

routes.use('/users', UserRoutes);

routes.use('/transations', TransationsRoutes );

routes.use('/userExtract', userExtractRouter );


export default routes;
