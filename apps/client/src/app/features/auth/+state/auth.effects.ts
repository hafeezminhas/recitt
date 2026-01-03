import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions // private authService: authService
  ) {}

  // private actions$ = inject(Actions);
}
