import { Account } from '@database/entities/account.entity';
import { AccountResponseDto } from '@dto/account.dto';
import { AddressDto } from '@dto/address.dto';
import { AccountStatus } from '@recitt/types';

export class AccountMapper {
  static toResponseDto(entity: Account): AccountResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      registrationNumber: entity.registrationNumber,
      registrationType: entity.registrationType,
      registrationDate: entity.registrationDate,
      address: entity.address as AddressDto,
      email: entity.email,
      phone: entity.phone,
      alternatePhone: entity.alternatePhone,
      billingInformation: null,
      accountAdmin: null,
      isVatRegistered: entity.isVatRegistered,
      vatNumber: entity.vatNumber,
      vatRegistrationDate: entity.vatRegistrationDate,
      status: entity.status as AccountStatus.PENDING_VERIFICATION,
      statusUpdatedAt: entity.statusUpdatedAt,
      suspensionReason: entity.suspensionReason,
      isActive: entity.isActive,
      deactivatedAt: entity.deactivatedAt,
      deactivationReason: entity.deactivationReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
