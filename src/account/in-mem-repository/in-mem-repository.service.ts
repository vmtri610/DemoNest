import { Injectable } from '@nestjs/common';
import {
  Account,
  AccountRepository,
  Payment,
} from '../../domain/account.domain';
import { DirectoryInt } from '../../utils/directory.utils';

@Injectable()
export class InMemRepositoryService implements AccountRepository {
  private accounts: DirectoryInt<Account>;

  constructor() {
    this.accounts = {};
  }

  getAccount(id: string): Promise<Account> {
    return this.accounts[id];
  }

  createAccount(account: Account) {
    this.accounts[account.id] = account;
  }

  updateAccount(account: Account) {
    this.accounts[account.id] = account;
  }

  deleteAccount(id: string) {
    delete this.accounts[id];
  }

  getAllAccounts(): Promise<Account[]> {
    return;
  }

  transfer(payment: Payment): any {
    this.accounts[payment.from].balance -= payment.amount;
    this.accounts[payment.to].balance += payment.amount;
  }
}
