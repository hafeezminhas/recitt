import { inject, Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';

import * as AppActions from './app.actions';
import * as AppSelectors from './app.selectors';

@Injectable({ providedIn: 'root' })
export class AppFacade {
  private store = inject(Store);

  loading$$ = this.store.selectSignal(AppSelectors.isAppLoading);
  error$$ = this.store.selectSignal(AppSelectors.getAppError);

  startLoading() {
    this.dispatch(AppActions.startLoading);
  }

  stopLoading() {
    this.dispatch(AppActions.stopLoading);
  }

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
