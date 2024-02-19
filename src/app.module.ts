import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InMemRepositoryService } from './account/in-mem-repository/in-mem-repository.service';
import { FirestoreRepositoryService } from './account/firestore-repository/firestore-repository.service';
import { AccountBaseUseCaseService } from './account/base-use-case/base-use-case.service';
import { AccountBaseInteropService } from './account/account-base-interop/account-base-interop.service';
import { AccountController } from './account/account.controller';

@Module({
  imports: [],
  controllers: [AppController, AccountController],
  providers: [AppService, InMemRepositoryService, FirestoreRepositoryService, AccountBaseUseCaseService, AccountBaseInteropService],
})
export class AppModule {}
