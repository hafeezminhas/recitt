import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';

import {
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  RowComponent,
} from '@coreui/angular';

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
  ],
})
export class CustomerActivationComponent implements OnInit {
  activationKey: string;
  isActivationExpired$$ = signal(false);

  // constructor(
  //   private authService: AuthService,
  //   private route: ActivatedRoute
  // ) {}

  ngOnInit(): void {
    // this.activationKey = this.route.snapshot.paramMap.get('activationKey');
    // const result = this.route.snapshot.data['result'];
    // console.log('activationKey result: ', result);
    // if (result) {
    //   this.isActivationExpired$$.set(result.status && result.status === 410);
    //   this.showAlert = true;
    //   this.alert = {
    //     type: result.error ? 'error' : 'success',
    //     message: result.message,
    //   };
    // }

    console.log('oninit');
  }
}
