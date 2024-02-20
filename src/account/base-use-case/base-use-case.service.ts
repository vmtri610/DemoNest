import { Inject, Injectable } from '@nestjs/common';
import {
  Account,
  AccountRepository,
  AccountUseCase,
  ErrAccountNotFound,
  ErrBalanceNotNegative,
  ErrBalanceNotNumber,
  ErrExistedAccount,
  ErrInsufficientBalance,
  Payment,
} from '../../domain/account.domain';
import * as console from 'console';

@Injectable()
export class AccountBaseUseCaseService implements AccountUseCase {
  constructor(
    @Inject('AccountRepository') private accountRepo: AccountRepository,
  ) {}

  async transfer(payment: Payment) {
    let fromAccount = this.accountRepo.getAccount(payment.from);
    let toAccount = this.accountRepo.getAccount(payment.to);
    if (!fromAccount || !toAccount) {
      throw ErrAccountNotFound;
    }
    if ((await fromAccount).balance < payment.amount) {
      throw ErrInsufficientBalance;
    }
    this.accountRepo.transfer(payment);
  }

  getAccount(id: string): Promise<Account> {
    console.log('id', id);
    let account = this.accountRepo.getAccount(id);
    if (!account) {
      throw ErrAccountNotFound;
    }
    return this.accountRepo.getAccount(id);
  }

  createAccount(account: Account) {
    let existingAccount = this.accountRepo.getAccount(account.id);
    let balance = account.balance;
    console.log('balance', balance);
    if (balance < 0) {
      throw ErrBalanceNotNegative;
    }
    if (balance === null || isNaN(balance)) {
      throw ErrBalanceNotNumber;
    }
    if (existingAccount) {
      console.log('Account existed');
      throw ErrExistedAccount;
    }
    this.accountRepo.createAccount(account);
  }

  updateAccount(account: Account) {
    let balance = account.balance;
    if (balance < 0) {
      throw ErrBalanceNotNegative;
    }
    if (balance === null || isNaN(balance)) {
      throw ErrBalanceNotNumber;
    }
    this.accountRepo.updateAccount(account);
  }

  deleteAccount(id: string) {
    this.accountRepo.deleteAccount(id);
  }

  getAllAccounts(): Account[] {
    return this.accountRepo.getAllAccounts();
  }
}
