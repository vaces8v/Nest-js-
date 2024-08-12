import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext,): boolean {
    const request = context.switchToHttp().getRequest();
    const isAuth = request.headers.authorization === 'secret'
		if(!isAuth) throw new ForbiddenException("Not heave permission")

		return isAuth
  }
}