import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

declare module 'express-session' {
  interface SessionData {
    admin?: boolean;  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    if (!request.session?.admin) {
      response.redirect('/admin/login'); 
      return false; 
    }

    return true; 
  }
}