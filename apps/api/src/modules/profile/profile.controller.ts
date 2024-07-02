import { Controller, UseGuards } from '@nestjs/common'
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest'
import { ProfileService } from './profile.service'
import { contract } from '@cinestia/contract'
import { JwtGuard, Role, Roles } from '@cinestia/api/auth'

@Controller()
export class ProfileController {
	constructor(private readonly userService: ProfileService) {}

	@TsRestHandler(contract.profiles.updateProfile)
	@Roles(Role.User)
	@UseGuards(JwtGuard)
	async updateProfile() {
		return tsRestHandler(contract.profiles.updateProfile, async ({ body, params }) => {
			const profile = await this.userService.updateProfile(parseInt(params.id), body)

			if (!profile)
				return {
					status: 404,
					body: {
						message: 'Profile not found',
					},
				}
			return {
				status: 200,
				body: profile,
			}
		})
	}
}
