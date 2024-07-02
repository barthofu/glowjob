import { contract } from '@cinestia/contract'
import { Controller, NotFoundException, Req, UseGuards } from '@nestjs/common'
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest'
import { AuthService } from './auth.service'
import { JwtGuard } from './guards/jwt.guard'
import { LocalGuard } from './guards/local.guard'
import { UserModel } from '@cinestia/prisma'
import { z } from 'zod'

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@TsRestHandler(contract.auth.register)
	async register() {
		return tsRestHandler(contract.auth.register, async ({ body }) => {
			const user = await this.authService.register({
				email: body.email,
				firstName: body.firstName,
				lastName: body.lastName,
				gender: body.gender,
				password: body.password,
				confirmPassword: body.confirmPassword,
			})
			return {
				status: 201,
				body: user,
			}
		})
	}

	@TsRestHandler(contract.auth.login)
	@UseGuards(LocalGuard)
	async login(@Req() req: { user: z.infer<typeof UserModel> }) {
		return tsRestHandler(contract.auth.login, async ({ body }) => {
			const token = await this.authService.login(body.username, req.user)

			return {
				status: 200,
				body: {
					access_token: token,
					user: req.user,
				},
			}
		})
	}

	@TsRestHandler(contract.auth.me)
	@UseGuards(JwtGuard)
	async me() {
		return tsRestHandler(contract.auth.me, async ({ headers }) => {
			const user = await this.authService.me(headers.authorization)
			if (!user) throw new NotFoundException('User not found')

			return {
				status: 200,
				body: user,
			}
		})
	}
}
