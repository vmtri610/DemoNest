import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Headers,
} from '@nestjs/common';
import { Account, AccountInterop, Payment } from '../domain/account.domain';

@Controller('/v1/account')
export class AccountController {
  constructor(
    @Inject('AccountInterop') private accountInterop: AccountInterop,
  ) {}

  @Get('all')
  getAllAccounts() {
    return this.accountInterop.getAllAccounts('token');
  }

  @Get(':id')
  getAccount(@Headers() headers: any, @Param('id') id: string) {
    return this.accountInterop.getAccount(headers['authorization'], id);
  }

  @Post()
  createAccount(@Headers() headers: any, @Body() account: Account) {
    let token = headers['authorization'];
    return this.accountInterop.createAccount(token, account);
  }

  @Post('transfer')
  transfer(@Body() payment: Payment) {
    return this.accountInterop.transfer('token', payment);
  }

  @Put()
  updateAccount(@Body() account: Account) {
    return this.accountInterop.updateAccount('token', account);
  }

  @Delete(':id')
  deleteAccount(@Param('id') id: string) {
    return this.accountInterop.deleteAccount('token', id);
  }
}
