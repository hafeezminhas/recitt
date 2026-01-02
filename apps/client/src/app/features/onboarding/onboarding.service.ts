import { Injectable } from '@angular/core';
import {
  IAccountActivationPayload,
  IAccountResponse,
  IAccountResponseWithAdminUser,
  IAccountResponseWithBillingInfo,
  IAddAccountAdminUserRequest,
  IAddBillingInfoRequest,
  ICreateAccountRequest,
  IRequestSuccessRespose,
} from '@recitt/types';
import { DataService } from '@shared/services/data.service';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  private readonly apiPrefix = 'accounts';

  constructor(private dataService: DataService) {}

  loadOnboarding() {
    return this.dataService
      .getData<IAccountResponseWithAdminUser>(`${this.apiPrefix}`, {})
      .pipe(take(1));
  }

  addAccount(payload: ICreateAccountRequest): Observable<IAccountResponse> {
    return this.dataService
      .postData<ICreateAccountRequest, IAccountResponse>(
        this.apiPrefix,
        payload
      )
      .pipe(take(1));
  }

  addBillingInfo(
    payload: IAddBillingInfoRequest
  ): Observable<IAccountResponseWithBillingInfo> {
    return this.dataService
      .postData<IAddBillingInfoRequest, IAccountResponseWithBillingInfo>(
        `${this.apiPrefix}/billing`,
        payload
      )
      .pipe(take(1));
  }

  setupAdminUser(
    payload: IAddAccountAdminUserRequest
  ): Observable<IAccountResponseWithAdminUser> {
    return this.dataService
      .postData<IAddAccountAdminUserRequest, IAccountResponseWithAdminUser>(
        `${this.apiPrefix}/admin`,
        payload
      )
      .pipe(take(1));
  }

  activateCustomer(activationKey: string): Observable<IRequestSuccessRespose> {
    return this.dataService
      .postData<IAccountActivationPayload, IRequestSuccessRespose>(
        `${this.apiPrefix}/activate-account`,
        { activationKey }
      )
      .pipe(take(1));
  }
}
