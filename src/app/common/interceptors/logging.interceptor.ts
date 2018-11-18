import { NestInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    console.log('before...');

    const now = Date.now();

    return call$.pipe(tap(() => console.log(`after... ${Date.now() - now}ms`)));
  }
}
