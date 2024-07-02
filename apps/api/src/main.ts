import { openApiDocument } from '@cinestia/contract'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { json, urlencoded } from 'express'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// Swagger
	SwaggerModule.setup('/api/v1', app, openApiDocument)

	// Cors
	app.enableCors()

	// Request size limits
	app.use(json({ limit: '50mb' }))
	app.use(urlencoded({ limit: '50mb', extended: true }))

	const port = process.env.PORT || 3000
	await app.listen(port)

	Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
