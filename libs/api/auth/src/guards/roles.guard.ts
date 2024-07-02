import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { Role } from '../enum/role.enum'

@Injectable()
export class RolesGuard implements CanActivate {
	BEARER_LENGTH = 7

	constructor(private reflector: Reflector, private jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		])
		if (!requiredRoles) return true

		const [req] = context.getArgs()
		if (!req.headers['authorization']) return false

		const decryptToken = this.jwtService.decode(req.headers.authorization.slice(this.BEARER_LENGTH))
		if (!decryptToken || typeof decryptToken === 'string') return false

		if (decryptToken['role'] === 'admin') return true

		return requiredRoles.some((role) => decryptToken['role']?.includes(role))
	}
}
