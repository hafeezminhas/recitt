import { ApiProperty } from '@nestjs/swagger';
import { IAddress } from '@recitt/types';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDto implements IAddress {
  @ApiProperty({ example: '108 Oldham Court' })
  @IsString()
  @IsNotEmpty()
  building: string;

  @ApiProperty({ example: 'Bristol Road' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: 'Birmingham' })
  @IsString()
  @IsNotEmpty()
  town: string;

  @ApiProperty({ example: 'West Midlands' })
  @IsString()
  @IsNotEmpty()
  county: string;

  @ApiProperty({ example: 'B5 7AA' })
  @IsString()
  @IsNotEmpty()
  postcode: string;
}
