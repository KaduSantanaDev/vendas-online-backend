import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from 'src/auth/dtos/loginPayload.dto';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enums/userType.enum';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector, private readonly jwtService: JwtService){}
	
	async canActivate(context: ExecutionContext): Promise<boolean>{
		const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
		
		const {	authorization } = context.switchToHttp().getRequest().headers
		
		const loginPayload: LoginPayloadDto | undefined = await this.jwtService.verifyAsync(authorization, {secret: process.env.JWT_SECRET}).catch(() => undefined)
		
		if(!requiredRoles) {
			return true
		}
		
		if(!loginPayload) {
			return false
		}
		
		
		if(!requiredRoles) {
			return true
		}
		
		const {user} = context.switchToHttp().getRequest()
		return requiredRoles.some((role) => role === loginPayload.typeUser)
	}
}
