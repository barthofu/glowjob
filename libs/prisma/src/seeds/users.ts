import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const salt = 10

export const createUsers = async (prisma: PrismaClient) => {
	await prisma.user.create({
		data: {
			email: 'admin@cinestia.com',
			firstName: 'Admin',
			lastName: 'Admin',
			gender: 'Male',
			password: await bcrypt.hash('admin123', salt),
			role: 'admin',
		},
	})

	await prisma.user.create({
		data: {
			email: 'user@cinestia.com',
			firstName: 'User',
			lastName: 'User',
			gender: 'Female',
			password: await bcrypt.hash('user123', salt),
			role: 'user',
		},
	})

	await prisma.user.create({
		data: {
			email: 'dev.florian@gmail.com',
			firstName: 'Florian',
			lastName: 'HAVARD',
			gender: 'Male',
			password: await bcrypt.hash('flo123', salt),
			role: 'user',
		},
	})

	await prisma.user.create({
		data: {
			email: 'dev.bartho@gmail.com',
			firstName: 'Bartholomé',
			lastName: 'GILI',
			gender: 'Male',
			password: await bcrypt.hash('bartho123', salt),
			role: 'user',
		},
	})
}
