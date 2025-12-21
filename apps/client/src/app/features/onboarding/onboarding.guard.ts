import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { OnboardingFacade } from './+state/onboarding.facade';

@Injectable({
  providedIn: 'root',
})
export class OnboardingGuard implements CanActivate {
  constructor(private facade: OnboardingFacade, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const targetStep = route.data['stepNumber'];
    return this.facade.canAccessStep(targetStep).pipe(
      take(1),
      tap((allowed) => {
        if (!allowed) this.router.navigate(['/onboarding']);
      })
    );
  }
}
