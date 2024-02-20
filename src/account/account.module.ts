import { Module } from '@nestjs/common';
import { AccountBaseInteropService } from './account-base-interop/account-base-interop.service';
import { InMemRepositoryService } from './in-mem-repository/in-mem-repository.service';
import { AccountBaseUseCaseService } from './base-use-case/base-use-case.service';
import { AccountController } from './account.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [
    {
      provide: 'AccountRepository',
      useClass: InMemRepositoryService,
    },
    {
      provide: 'AccountUseCase',
      useClass: AccountBaseUseCaseService,
    },
    {
      provide: 'AccountInterop',
      useClass: AccountBaseInteropService,
    },
  ],
  controllers: [AccountController],
  exports: ['AccountRepository', 'AccountUseCase', 'AccountInterop'],
  imports: [AuthModule],
})
export class AccountModule {}
