import {
	PrismaService,
	UserUpdateOneSchema,
} from '@cinestia/prisma'
import { Injectable } from '@nestjs/common'
import { z } from 'zod'

@Injectable()
export class ProfileService {
	constructor(private prisma: PrismaService) {}

	getUser(id: number) {
		return this.prisma.user.findUnique({
			where: { id },
		})
	}

	getUsers() {
		return this.prisma.user.findMany()
	}

	async updateProfile(
		id: number,
		body: Pick<z.infer<typeof UserUpdateOneSchema>, 'data'>
	) {
		return this.prisma.user.update({
			where: {
				id: id,
			},
			data: body.data,
		})
	}
}
