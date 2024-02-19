import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AccountBaseInteropService } from "./account-base-interop/account-base-interop.service";
import { AccountBaseUseCaseService } from "./base-use-case/base-use-case.service";
import { AccountDomain } from "../domain/account.domain";

@Controller('/v1/account')
export class AccountController {
  constructor(private accountBaseInterop: AccountBaseInteropService) {
  }
  @Get(':id')
  getAccount(@Param('id') id: number) {
    return this.accountBaseInterop.getAccount('token', id)
  }
  @Post()
  createAccount(@Body() account: AccountDomain) {
    return this.accountBaseInterop.createAccount('token', account)
  }
  @Put()
  updateAccount(@Body() account: AccountDomain) {
    return this.accountBaseInterop.updateAccount('token', account)
  }
  @Delete(':id')
  deleteAccount(@Param('id') id: number) {
    return this.accountBaseInterop.deleteAccount('token', id)
  }
}
