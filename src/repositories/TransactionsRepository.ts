import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const summary = this.transactions.reduce((count, transaction) => {
      if (transaction.type == "income") {
        count.income += transaction.value
        count.total += transaction.value
      } else {
        count.outcome += transaction.value
        count.total -= transaction.value
      }
      return count
    }, {
      income: 0,
      outcome: 0,
      total: 0
    })

    return summary

  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;
