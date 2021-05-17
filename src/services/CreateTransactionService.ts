import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface INewTransactionProps {
  title: string,
  type: string,
  value: number
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, title, type }: INewTransactionProps): Transaction {

    const newTransaction = new Transaction({ title, value, type: type == 'income' ? type : 'outcome' })

    const addTransaction = this.transactionsRepository.create(newTransaction)

    return addTransaction
  }
}

export default CreateTransactionService;
