import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: Transaction): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (transaction.type === 'outcome' && transaction.value > balance.total)
      throw new Error('saldo indisponivel para esta transação. ');

    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
