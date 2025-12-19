import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@nestjs/common';
import { Observable, take, tap } from 'rxjs';
import { OnboardingFacade } from './+state/onboarding.facade';

@Injectable()
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
