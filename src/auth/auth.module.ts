import { Module } from '@nestjs/common';
import { FirebaseService } from './repository/firebase/firebase.service';
import { AuthBaseUsecaseService } from './usecase/auth-base-usecase/auth-base-usecase.service';

@Module({
  providers: [
    {
      provide: 'AuthRepository',
      useClass: FirebaseService,
    },
    {
      provide: 'AuthUseCase',
      useClass: AuthBaseUsecaseService,
    },
  ],
  exports: ['AuthUseCase', 'AuthRepository'],
})
export class AuthModule {}
