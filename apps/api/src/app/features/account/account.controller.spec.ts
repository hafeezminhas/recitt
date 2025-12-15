import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountDto } from '@recitt/types';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

describe('AccountController', () => {
  let controller: AccountController;
  let accountService: Partial<Record<keyof AccountService, jest.Mock>>;

  beforeEach(async () => {
    accountService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
    })
      .useMocker((token) => {
        if (token === AccountService) return accountService;
      })
      .compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createAccount calls service and returns created account', async () => {
    const payload: CreateAccountDto = {
      name: 'Acme Ltd',
      registrationNumber: '12345678',
      registrationType:
        'limited_company' as unknown as CreateAccountDto['registrationType'],
      address: {
        building: '1',
        street: 'High St',
        town: 'London',
        county: 'Greater London',
        postCode: 'SW1A 1AA',
      },
      billingEmail: 'billing@acme.com',
      billingPhone: '+441234567890',
    } as unknown as CreateAccountDto;

    const created = { id: 'account-1', ...payload };
    (accountService.create as jest.Mock).mockResolvedValue(created);

    const result = await controller.createAccount(payload);

    expect(accountService.create).toHaveBeenCalledWith(payload);
    expect(result).toEqual(created);
  });

  it('createAccount should propagate service errors', async () => {
    const payload: CreateAccountDto = {
      name: 'Acme Ltd',
      registrationNumber: '12345678',
      registrationType:
        'limited_company' as unknown as CreateAccountDto['registrationType'],
      address: {
        building: '1',
        street: 'High St',
        town: 'London',
        county: 'Greater London',
        postCode: 'SW1A 1AA',
      },
      billingEmail: 'billing@acme.com',
      billingPhone: '+441234567890',
    } as unknown as CreateAccountDto;

    (accountService.create as jest.Mock).mockRejectedValue(
      new Error('create failed')
    );

    await expect(controller.createAccount(payload)).rejects.toThrow(
      'create failed'
    );
  });
});
