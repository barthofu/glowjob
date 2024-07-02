import { PrismaService } from '@cinestia/prisma'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	// CRUD

	getUser(id: number) {
		return this.prisma.user.findUnique({
			where: { id },
		})
	}

	getUsers() {
		return this.prisma.user.findMany()
	}
}
