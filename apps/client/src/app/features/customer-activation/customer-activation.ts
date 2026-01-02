import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';

import {
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  RowComponent,
} from '@coreui/angular';
import { freeSet } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { IRequestSuccessRespose } from '@recitt/types';
import { map } from 'rxjs';

@Component({
  selector: 'app-customer-activation',
  templateUrl: './customer-activation.html',
  styleUrl: './customer-activation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    CardComponent,
    CardBodyComponent,
    IconDirective,
    RouterModule,
  ],
})
export class CustomerActivationComponent {
  readonly icons = freeSet;

  activationResult$$ = toSignal<IRequestSuccessRespose>(
    this.route.data.pipe(
      map(({ data }) => {
        if (data) {
          return { message: data['message'], status: data.status };
        }
        return { message: 'Action not successful.', status: false };
      })
    )
  );
  iconClass$$: Signal<string[]> = computed(() => {
    return [this.activationResult$$()?.status ? 'icon-success' : 'icon-danger'];
  });

  constructor(private route: ActivatedRoute) {}
}
