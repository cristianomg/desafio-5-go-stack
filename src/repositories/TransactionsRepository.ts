import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = { income: 0, outcome: 0, total: 0 };

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        balance.income += transaction.value;
        balance.total += transaction.value;
      } else {
        balance.outcome += transaction.value;
        balance.total -= transaction.value;
      }
    });
    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const newTransaction = new Transaction({ title, value, type });
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
