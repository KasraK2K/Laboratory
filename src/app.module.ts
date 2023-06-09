import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { ConfigModule } from '@nestjs/config'
import { MysqlDatabaseType } from './common/interfaces/general.interface'
import { AppUserModule } from './app-user/app-user.module'
import { AuthModule } from './auth/auth.module'
import { PortalUserModule } from './portal-user/portal-user.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? ['.env.development', '.env']
          : process.env.NODE_ENV === 'production'
          ? ['.env.production', '.env']
          : ['.env.local', '.env'],
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as MysqlDatabaseType,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV === 'development',
      autoLoadEntities: true
    }),
    AppUserModule,
    AuthModule,
    PortalUserModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
