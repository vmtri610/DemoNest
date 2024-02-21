import { Inject, Injectable } from '@nestjs/common';
import {
  Account,
  AccountInterop,
  AccountUseCase,
  Payment,
} from '../../domain/account.domain';
import { AuthUseCase, ErrMessUnauthorized } from '../../domain/auth.domain';

@Injectable()
export class AccountBaseInteropService implements AccountInterop {
  constructor(
    @Inject('AccountUseCase') private accountUseCase: AccountUseCase,
    @Inject('AuthUseCase') private authUseCase: AuthUseCase,
  ) {}

  async getAccount(token: string, id: string): Promise<Account> {
    try {
      let decodedToken = await this.authUseCase.verifyToken(token);
      return await this.accountUseCase.getAccount(decodedToken.uid);
    } catch (error) {
      throw ErrMessUnauthorized;
    }
  }

  async createAccount(token: string, account: Account) {
    try {
      let decodedToken = await this.authUseCase.verifyToken(token);
      account.id = decodedToken.uid;
      return this.accountUseCase.createAccount(account);
    } catch (error) {
      throw error;
    }
  }

  updateAccount(token: string, account: Account) {
    this.accountUseCase.updateAccount(account);
  }

  async deleteAccount(token: string, id: string) {
    let decodedToken = await this.authUseCase.verifyToken(token);
    this.accountUseCase.deleteAccount(decodedToken.uid);
  }

  getAllAccounts(token: string): Promise<Account[]> {
    return this.accountUseCase.getAllAccounts();
  }

  transfer(token: string, payment: Payment): any {
    this.accountUseCase.transfer(payment);
  }
}
