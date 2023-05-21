import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { IResponse } from '../interfaces/general.interface'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        data,
        meta: {
          backend_version: process.env.BACKEND_VERSION,
          app_version: process.env.APP_VERSION,
          website_version: process.env.WEBSITE_VERSION,
          portal_version: process.env.PORTAL_VERSION
        }
      }))
    )
  }
}
