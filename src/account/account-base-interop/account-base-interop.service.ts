import { Injectable } from '@nestjs/common';
import { AccountDomain, AccountInterop } from "../../domain/account.domain";
import { AccountBaseUseCaseService } from "../base-use-case/base-use-case.service";

@Injectable()
export class AccountBaseInteropService implements AccountInterop {
  constructor(private accountUseCase: AccountBaseUseCaseService) {
  }
    getAccount(token: string, id: number): AccountDomain {
        return this.accountUseCase.getAccount(id)
    }
    createAccount(token: string, account: AccountDomain) {
        this.accountUseCase.createAccount(account)
    }
    updateAccount(token: string, account: AccountDomain) {
        this.accountUseCase.updateAccount(account)
    }
    deleteAccount(token: string, id: number) {
        this.accountUseCase.deleteAccount(id)
    }
}
