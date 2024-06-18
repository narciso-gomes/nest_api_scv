import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const code = err.code;
        switch (code) {
          case 'P2002':
            if (err.message.includes('name'))
              throw new ConflictException(
                'Um registro com esse nome já existe',
              );
            break;
          default:
            break;
        }
        throw new BadGatewayException();
      }),
    );
  }
}
