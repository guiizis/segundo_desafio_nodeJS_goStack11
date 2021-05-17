import { Router } from 'express';
import transactionRouter from './transaction.routes';

const routes = Router();

routes.use('/Transactions', transactionRouter);

export default routes;
