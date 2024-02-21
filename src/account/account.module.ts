import { Module } from '@nestjs/common';
import { AccountBaseInteropService } from './account-base-interop/account-base-interop.service';
import { AccountBaseUseCaseService } from './base-use-case/base-use-case.service';
import { AccountController } from './account.controller';
import { AuthModule } from '../auth/auth.module';
import { FirestoreRepositoryService } from './firestore-repository/firestore-repository.service';

@Module({
  providers: [
    {
      provide: 'AccountRepository',
      useClass: FirestoreRepositoryService,
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
