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
import {
  ApiTags,
  ApiResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTooManyRequestsResponse
} from '@nestjs/swagger'
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
import { createResponse } from './swagger/create.swagger'
import { forbidden, tooManyRequest } from '../common/swagger/swagger.response'
import { DeleteResult, UpdateResult } from 'typeorm'

@ApiTags('App Users')
@ApiResponse(tooManyRequest)
@ApiResponse(forbidden)
@Controller('app-user')
export class AppUserController {
  constructor(private readonly appUserService: AppUserService) {}

  @Post()
  @ApiCreatedResponse(createResponse)
  async create(
    @Body(new ValidationPipe({ whitelist: true })) createAppUserDto: CreateAppUserDto
  ): Promise<Partial<AppUser>> {
    const result = await this.appUserService.create(createAppUserDto)
    return plainToInstance(AppUserResponseDto, result, { excludePrefixes: ['opt', 'opt_time'] })
  }

  // @UseGuards(AppUserGuard, RolesGuard)
  // @Roles(RoleName.DOCTOR, RoleName.RECEPTIONIST)
  // @Permissions(PermissionName.NORMAL)
  @Get()
  @ApiResponse({ status: 200, description: 'successful.' })
  async findAll(): Promise<Partial<AppUser>[]> {
    const result = await this.appUserService.findAll()
    return plainToInstance(AppUserResponseDto, result, { excludePrefixes: ['otp'] })
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'successful.' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Partial<AppUser>> {
    const result = await this.appUserService.findById(id)
    return plainToInstance(AppUserResponseDto, result, { excludePrefixes: ['otp'] })
  }

  @Post('one')
  @ApiResponse({ status: 200, description: 'successful.' })
  async findOne(
    @Body(new ValidationPipe({ whitelist: true })) findAppUserDto: FindAppUserDto
  ): Promise<Partial<AppUser>> {
    const result = await this.appUserService.findOne(findAppUserDto)
    return plainToInstance(AppUserResponseDto, result, { excludePrefixes: ['otp'] })
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: 'successfully updated.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true })) updateAppUserDto: UpdateAppUserDto
  ): Promise<UpdateResult> {
    return await this.appUserService.update(id, updateAppUserDto)
  }

  @Delete('soft/:id')
  @ApiResponse({ status: 201, description: 'successfully archived.' })
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<UpdateResult> {
    return await this.appUserService.softDelete(id)
  }

  @Patch('restore/:id')
  @ApiResponse({ status: 201, description: 'successfully restored.' })
  async restore(@Param('id', ParseIntPipe) id: number): Promise<UpdateResult> {
    return await this.appUserService.restore(id)
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'successfully removed.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.appUserService.remove(id)
  }
}
