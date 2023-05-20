import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength } from 'class-validator'

export class FindAppUserDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  id?: number

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  @IsOptional()
  id_number?: string

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

  @ApiPropertyOptional()
  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  email?: string

  @ApiPropertyOptional()
  @IsMobilePhone('fa-IR')
  @IsOptional()
  contact_number?: string
}
