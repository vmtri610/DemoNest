import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './account/account.controller';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AccountModule, AuthModule],
  providers: [AppService],
  controllers: [AppController, AccountController],
})
export class AppModule {}
