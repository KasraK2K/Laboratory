import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from 'class-validator'

export class CreateAppUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  id_number: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(100)
  first_name?: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(100)
  surname?: string

  @ApiProperty()
  @IsEmail()
  @MaxLength(100)
  email: string

  @ApiProperty()
  @IsMobilePhone('fa-IR')
  contact_number: string
}
