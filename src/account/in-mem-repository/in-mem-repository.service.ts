import { Injectable } from '@nestjs/common';
import { AccountDomain, AccountRepository } from "../../domain/account.domain";
import { DirectoryInt } from "../../utils/directory.utils";

@Injectable()
export class InMemRepositoryService implements AccountRepository {
  private accounts: DirectoryInt<AccountDomain>
  constructor() {
    this.accounts = {}
  }
    getAccount(id: number): AccountDomain {
      return this.accounts[id]
    }
    createAccount(account: AccountDomain) {
      this.accounts[account.id] = account
    }
    updateAccount(account: AccountDomain) {
      this.accounts[account.id] = account
    }
    deleteAccount(id: number) {
      delete this.accounts[id]
    }
}
