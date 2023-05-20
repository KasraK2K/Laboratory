import { PartialType } from '@nestjs/mapped-types'
import { CreateAppUserDto } from './create-app-user.dto'
import { OmitType } from '@nestjs/swagger'

export class UpdateAppUserDto extends PartialType(OmitType(CreateAppUserDto, ['id_number'])) {}
