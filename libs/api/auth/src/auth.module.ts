import { Module } from '@nestjs/common'
import { AuthService, jwtConstants } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './guards/roles.guard'

@Module({
	imports: [JwtModule.register({
		secret: jwtConstants.secret,
		signOptions: { expiresIn: '1d' },
		global: true
	})],
	providers: [AuthService, LocalStrategy, JwtStrategy, {
		provide: APP_GUARD,
		useClass: RolesGuard,
	},],
	controllers: [AuthController],
})
export class AuthModule { }
