import { Test, TestingModule } from '@nestjs/testing';
import { AccountBaseInteropService } from './account-base-interop.service';

describe('AccountBaseInteropService', () => {
  let service: AccountBaseInteropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountBaseInteropService],
    }).compile();

    service = module.get<AccountBaseInteropService>(AccountBaseInteropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
