import { Injectable } from '@angular/core';
import { ICredentials, ISigninResponse, IUserProfile } from '@recitt/types';
import { DataService } from '@shared/services/data.service';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly apiPrefix = 'auth';

  constructor(private dataService: DataService) {}

  login(payload: ICredentials): Observable<ISigninResponse> {
    return this.dataService
      .postData<ICredentials, ISigninResponse>(
        `${this.apiPrefix}/signin`,
        payload
      )
      .pipe(take(1));
  }

  getProfile(): Observable<IUserProfile> {
    return this.dataService
      .getData<IUserProfile>(`${this.apiPrefix}/profile`)
      .pipe(take(1));
  }
}
