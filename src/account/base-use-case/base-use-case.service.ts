import { Injectable } from '@nestjs/common';
import { AccountDomain, AccountUseCase } from "../../domain/account.domain";
import { InMemRepositoryService } from "../in-mem-repository/in-mem-repository.service";

@Injectable()
export class AccountBaseUseCaseService implements AccountUseCase {
  constructor(private accountRepository: InMemRepositoryService) {
  }
    getAccount(id: number): AccountDomain {
        return this.accountRepository.getAccount(id)
    }
    createAccount(account: AccountDomain) {
        this.accountRepository.createAccount(account)
    }
    updateAccount(account: AccountDomain) {
        this.accountRepository.updateAccount(account)
    }
    deleteAccount(id: number) {
        this.accountRepository.deleteAccount(id)
    }
}
