import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFacade } from '../auth/+state/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authFacade: AuthFacade) {}

  canActivate(): Observable<boolean> {
    return this.authFacade.isAccountAdmin$;
  }
}
