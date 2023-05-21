import AppUser from './entities/app-user.entity'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { ApiTags, ApiForbiddenResponse, ApiTooManyRequestsResponse } from '@nestjs/swagger'
import { AppUserService } from './app-user.service'
import { CreateAppUserDto } from './dto/create-app-user.dto'
import { UpdateAppUserDto } from './dto/update-app-user.dto'
import { FindAppUserDto } from './dto/find-app-user.dto'
import { plainToInstance } from 'class-transformer'
import { AppUserResponseDto } from './dto/app-user-response.dto'
import { AppUserGuard } from './../auth/guards/appUser.guard'
import { RolesGuard } from '../auth/guards/role.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { PermissionName, RoleName } from '../common/enums/general.enum'
import { Permissions } from '../auth/decorators/permissions.decorator'
import { forbidden, tooManyRequest } from '../common/swagger/swagger.response'
import { DeleteResult, UpdateResult } from 'typeorm'

@ApiTags('App Users')
@ApiForbiddenResponse(forbidden)
@ApiTooManyRequestsResponse(tooManyRequest)
@Controller('app-user')
export class AppUserController {
  constructor(private readonly appUserService: AppUserService) {}

  @Post()
  async create(
    @Body(new ValidationPipe({ whitelist: true })) createAppUserDto: CreateAppUserDto
  ): Promise<Partial<AppUser>> {
    const result = await this.appUserService.create(createAppUserDto)
    return plainToInstance(AppUserResponseDto, result, { excludePrefixes: ['opt'] })
  }

  // @UseGuards(AppUserGuard, RolesGuard)
  // @Roles(RoleName.DOCTOR, RoleName.RECEPTIONIST)
  // @Permissions(PermissionName.NORMAL)
  @Get()
  async findAll(): Promise<Partial<AppUser>[]> {
    const result = await this.appUserService.findAll()
    return plainToInstance(AppUserResponseDto, result, { excludePrefixes: ['otp'] })
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Partial<AppUser>> {
    const result = await this.appUserService.findById(id)
    return plainToInstance(AppUserResponseDto, result, { excludePrefixes: ['otp'] })
  }

  @Post('one')
  async findOne(
    @Body(new ValidationPipe({ whitelist: true })) findAppUserDto: FindAppUserDto
  ): Promise<Partial<AppUser>> {
    const result = await this.appUserService.findOne(findAppUserDto)
    return plainToInstance(AppUserResponseDto, result, { excludePrefixes: ['otp'] })
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true })) updateAppUserDto: UpdateAppUserDto
  ): Promise<UpdateResult> {
    return await this.appUserService.update(id, updateAppUserDto)
  }

  @Delete('soft/:id')
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<UpdateResult> {
    return await this.appUserService.softDelete(id)
  }

  @Patch('restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number): Promise<UpdateResult> {
    return await this.appUserService.restore(id)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.appUserService.remove(id)
  }
}
