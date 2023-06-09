import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const logger = new Logger(bootstrap.name)

  const port = process.env.PORT || 3000
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  app.enableVersioning({
    defaultVersion: process.env.DEFAULT_API_VERSION,
    type: VersioningType.URI
  })

  const config = new DocumentBuilder()
    .setTitle('Other')
    .setDescription('Laboratory Service')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  app.useGlobalPipes(new ValidationPipe({ transform: true })) // Force to use validation in each API

  await app
    .listen(port, '0.0.0.0')
    .then(() => logger.log(`Laboratory service version ${process.env.DEFAULT_API_VERSION} is running on port ${port}`))
    .catch((error) => logger.error(error))
}
bootstrap()
