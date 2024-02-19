import { HttpException, HttpStatus } from "@nestjs/common";

export interface AccountDomain{
  id: number,
  name: string,
  balance: number
}

export interface AccountRepository{
  getAccount(id: number): AccountDomain
  createAccount(account: AccountDomain)
  updateAccount(account: AccountDomain)
  deleteAccount(id: number)
}

export interface AccountUseCase{
  getAccount(id: number): AccountDomain
  createAccount(account: AccountDomain)
  updateAccount(account: AccountDomain)
  deleteAccount(id: number)
}

export interface AccountInterop{
  getAccount(token:string,id: number): AccountDomain
  createAccount(token:string,account: AccountDomain)
  updateAccount(token:string,account: AccountDomain)
  deleteAccount(token:string,id: number)
}

export class ErrorAccountException extends HttpException {
  constructor() {
    super('errorAccount', HttpStatus.FORBIDDEN);
  }
}

