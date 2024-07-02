import { PrismaService, UserModel } from '@cinestia/prisma'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import * as bcrypt from 'bcrypt'
import { omit } from 'radash'
import { z } from 'zod'

export const jwtConstants = {
	secret: process.env['JWT_PASS'],
}

@Injectable()
export class AuthService {
	BEARER_LENGTH = 7

	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async register(data: {
		email: string
		password: string
		confirmPassword: string
		firstName: string
		lastName: string
		gender: string
	}) {
		if (data.password !== data.confirmPassword) throw new BadRequestException("Two passwords doesn't match")

		return this.prisma.user
			.create({
				data: {
					email: data.email,
					firstName: data.firstName,
					lastName: data.lastName,
					gender: data.gender,
					password: await bcrypt.hash(data.password, 10),
				},
			})
			.catch((error) => {
				if (error instanceof PrismaClientKnownRequestError) {
					if (error.code === 'P2002') throw new ConflictException('Entry already exist')
				}
				console.log(error)
				throw new InternalServerErrorException('Unknow Error')
			})
	}

	async validateUser(email: string, password: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: email,
			},
		})
		if (user) {
			if (await bcrypt.compare(password, user.password)) {
				return user
			}
		}
		return null
	}

	async login(email: string, user: z.infer<typeof UserModel>) {
		const payload = {
			email: email,
			sub: user.id,
			role: user.role,
			firstName: user.firstName,
			lastName: user.lastName,
		}
		return this.jwtService.sign(payload)
	}

	async me(token: string | undefined) {
		if (!token) return null

		const decryptToken = this.jwtService.decode(token.slice(this.BEARER_LENGTH))
		if (!decryptToken || typeof decryptToken == 'string') return null

		const user = await this.prisma.user.findUnique({
			where: {
				email: decryptToken['email'],
			},
			include: {
				reservations: {
					include: {
						screening: {
							include: {
								movie: {
									include: {
										poster: true,
									},
								},
							},
						},
					},
				},
			},
		})
		if (!user) return null

		return omit(user, ['password'])
	}
}
