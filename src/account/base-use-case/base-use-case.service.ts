import { Inject, Injectable } from '@nestjs/common';
import {
  Account,
  AccountRepository,
  AccountUseCase,
  ErrAccountNotFound,
  ErrBalanceNotNegative,
  ErrBalanceNotNumber,
  ErrInsufficientBalance,
  Payment,
} from '../../domain/account.domain';

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
    let account = this.accountRepo.getAccount(id);
    if (!account) {
      throw ErrAccountNotFound;
    }
    return this.accountRepo.getAccount(id);
  }

  async createAccount(account: Account) {
    try {
      await this.accountRepo.getAccount(account.id);
    } catch (e) {
      try {
        let balance = account.balance;
        if (balance < 0) {
          throw ErrBalanceNotNegative;
        }
        if (balance === null || isNaN(balance)) {
          throw ErrBalanceNotNumber;
        }
        return this.accountRepo.createAccount(account);
      } catch (g) {
        throw g;
      }
    }
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

  getAllAccounts(): Promise<Account[]> {
    return this.accountRepo.getAllAccounts();
  }
}
