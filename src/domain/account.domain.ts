import { HttpException, HttpStatus } from '@nestjs/common';

export interface Account {
  id: string;
  name: string;
  balance: number;
}

export interface Payment {
  from: string;
  to: string;
  amount: number;
}

export interface AccountRepository {
  getAccount(id: string): Promise<Account>;

  getAllAccounts(): Promise<Account[]>;

  createAccount(account: Account): any;

  updateAccount(account: Account): any;

  deleteAccount(id: string): any;

  transfer(payment: Payment): any;
}

export interface AccountUseCase {
  getAccount(id: string): Promise<Account>;

  getAllAccounts(): Promise<Account[]>;

  createAccount(account: Account): any;

  updateAccount(account: Account): any;

  deleteAccount(id: string): any;

  transfer(payment: Payment): any;
}

export interface AccountInterop {
  getAccount(token: string, id: string): Promise<Account>;

  getAllAccounts(token: string): Promise<Account[]>;

  createAccount(token: string, account: Account): any;

  updateAccount(token: string, account: Account): any;

  deleteAccount(token: string, id: string): any;

  transfer(token: string, payment: Payment): any;
}

export const ErrExistedAccount = new HttpException(
  'Account existed',
  HttpStatus.BAD_REQUEST,
);

export const ErrBalanceNotNegative = new HttpException(
  'Balance must not be negative',
  HttpStatus.BAD_REQUEST,
);

export const ErrBalanceNotNumber = new HttpException(
  'Balance must be a number',
  HttpStatus.BAD_REQUEST,
);

export const ErrAccountNotFound = new HttpException(
  'Account not found',
  HttpStatus.NOT_FOUND,
);

export const ErrInsufficientBalance = new HttpException(
  'Insufficient balance',
  HttpStatus.BAD_REQUEST,
);
