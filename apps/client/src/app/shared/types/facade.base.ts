import { Action, Store } from '@ngrx/store';

/**
 * Base facade class that provides a consistent `dispatch` helper to child facades.
 *
 * Use by extending this class and calling `super(store)` from the constructor.
 */
export abstract class FacadeBase {
  protected constructor(protected store: Store) { }

  protected dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
