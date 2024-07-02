import { contract } from '@cinestia/contract'
import { Controller, UseGuards } from '@nestjs/common'
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest'
import { UserService } from './user.service'
import { Roles, Role, JwtGuard } from '@cinestia/api/auth'

@Controller()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@TsRestHandler(contract.users.getUsers)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async getUsers() {
		return tsRestHandler(contract.users.getUsers, async () => {
			const users = await this.userService.getUsers()
			return {
				status: 200,
				body: users,
			}
		})
	}

	@TsRestHandler(contract.users.getUser)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async getUser() {
		return tsRestHandler(contract.users.getUser, async ({ params }) => {
			const user = await this.userService.getUser(parseInt(params.id))

			if (!user)
				return {
					status: 404,
					body: {
						message: 'User not found',
					},
				}

			return {
				status: 200,
				body: user,
			}
		})
	}
}
