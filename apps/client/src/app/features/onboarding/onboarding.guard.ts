import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { OnboardingFacade } from './+state/onboarding.facade';
import { onboardingRoutesList } from './onboarding.routes';

@Injectable({
  providedIn: 'root',
})
export class OnboardingGuard implements CanActivate {
  constructor(private facade: OnboardingFacade, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const targetStep = route.data['step'];

    if (this.facade.onboardingCompleted$$()) {
      if (
        route.url.length === 0 ||
        onboardingRoutesList.includes(route.url[0].path)
      ) {
        this.router.navigateByUrl('/login');
        return of(false);
      }
    }

    if (targetStep === 'completion') {
      return this.facade.onboardingCompleted$.pipe(
        take(1),
        map((completed) => {
          if (completed) {
            return true;
          }
          return false;
        })
      );
    }

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
