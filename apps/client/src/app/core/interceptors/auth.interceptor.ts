import {
  HttpContextToken,
  HttpInterceptorFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@env/environment';
import { AuthFacade } from '@features/auth/+state/auth.facade';

export const SKIP_AUTH_INTERCEPTOR = new HttpContextToken(() => false);

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.context.get(SKIP_AUTH_INTERCEPTOR)) {
    return next(request);
  }
  if (request.headers.has('skipHeader')) {
    const headers = request.headers.delete('skipHeader');
    request = request.clone({ headers });
    return next(request);
  }
  try {
    const auth = inject(AuthFacade);
    const apiKey = auth.apiKey$$() ?? localStorage.getItem(environment.authKey);
    if (apiKey) {
      const headerName = 'Authorization';
      const cloned = request.clone({ setHeaders: { [headerName]: `Bearer ${apiKey}` } });
      return next(cloned);
    }
  } catch {
    // ignore injector errors in non-DI contexts
  }
  return next(request);
}
