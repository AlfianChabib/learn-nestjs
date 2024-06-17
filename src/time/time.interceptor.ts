import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const cookie = request.cookies['access'];
    if (cookie) {
      next.handle().subscribe((request.headers['authorization'] = cookie));
    }

    return next.handle().pipe(
      map((value) => {
        value.timestamp = new Date();
        console.log(value);
        console.log(request.headers['authorization']);
        return value;
      }),
    );
  }
}
