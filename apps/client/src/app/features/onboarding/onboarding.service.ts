import { Injectable } from '@angular/core';
import {
  IAccountResponse,
  IAccountResponseWithBillingInfo,
  IAddBillingInfoRequest,
  ICreateAccountRequest,
} from '@recitt/types';
import { DataService } from '@shared/services/data.service';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  private readonly apiPrefix = 'accounts';

  constructor(private dataService: DataService) {}

  getAccount(accountId: string): Observable<IAccountResponse> {
    return this.dataService.getData<IAccountResponse>(
      `${this.apiPrefix}/${accountId}`
    );
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
}
