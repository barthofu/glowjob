import { PrismaModule } from '@cinestia/prisma'
import { AuthModule } from '@cinestia/api/auth'
import { Module } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'
import { CoreModule } from './core/core.module'
import { MovieModule } from './modules/movie/movie.module'
import { ReservationModule } from './modules/reservation/reservation.module'
import { ScreeningModule } from './modules/screening/screening.module'
import { ProfileModule } from './modules/profile/profile.module'
import { UserModule } from './modules/user/user.module'

@Module({
	imports: [
		PrismaModule,
		CoreModule,
		UserModule,
		AuthModule,
		MovieModule,
		ScreeningModule,
		ProfileModule,
		ReservationModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ZodValidationPipe,
		},
	],
})
export class AppModule {}
