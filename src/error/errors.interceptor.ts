import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { NotFoundError, Observable } from 'rxjs';
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
          case 'P2025':
            throw new NotFoundException('Registro não encontrado');
          default:
            break;
        }
        throw new BadGatewayException();
      }),
    );
  }
}
