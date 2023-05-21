import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { StrategyName } from '../../common/enums/general.enum'

@Injectable()
export class PortalUserGuard extends AuthGuard(StrategyName.PORTAL_USER) {}
