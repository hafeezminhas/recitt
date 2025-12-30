import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { CanComponentDeactivate } from "@shared/types/can-deactivate";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard
  implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
  ): boolean | Observable<boolean> {
    return component.canDeactivate();
  }
}
