import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { OnboardingFacade } from './+state/onboarding.facade';

@Injectable({
  providedIn: 'root',
})
export class OnboardingGuard implements CanActivate {
  constructor(private facade: OnboardingFacade, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const targetStep = route.data['stepNumber'];

    return this.facade.canAccessStep(targetStep).pipe(
      take(1),
      map((allowed) => {
        if (allowed) {
          return true;
        }

        return this.router.parseUrl('/onboarding');
      })
    );
  }
}
