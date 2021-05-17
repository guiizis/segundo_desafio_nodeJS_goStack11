import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {

    const allTransactions = transactionsRepository.all()
    const balance = transactionsRepository.getBalance()
    return response.json({ Transactions: allTransactions, balance })
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {

    const { title, value, type } = request.body

    if (type == "outcome") {
      const balance = transactionsRepository.getBalance()
      if (value > balance.total) {
        return response.status(400).json({ error: "You Have no Credits Enough For This 😢" });
      }
    }

    const createTransaction = new CreateTransactionService(transactionsRepository)

    const newTransaction = createTransaction.execute({ value, type, title })

    return response.json(newTransaction)

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
