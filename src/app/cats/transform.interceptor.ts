import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    return call$.pipe(
      map(res => {
        return res.map(item => ({
          id: item.id,
          name: item.name,
          computed: `${item.id}_${item.name}`,
        }));
      }),
    );
  }
}
