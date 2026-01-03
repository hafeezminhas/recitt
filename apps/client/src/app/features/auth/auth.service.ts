import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ICredentials, ISigninResponse, IUserProfile } from '@recitt/types';
import { DataService } from '@shared/services/data.service';
import { jwtDecode } from 'jwt-decode';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly apiPrefix = 'auth';

  constructor(private dataService: DataService) { }

  login(payload: ICredentials): Observable<ISigninResponse> {
    return this.dataService.postData<ICredentials, ISigninResponse>(`${this.apiPrefix}/signin`, payload)
      .pipe(take(1));
  }

  getProfile(): Observable<IUserProfile> {
    return this.dataService.getData<IUserProfile>(`${this.apiPrefix}/profile`)
      .pipe(take(1));
  }

  isApiKeyExpired() {
    const token = localStorage.getItem(environment.authKey);
    if (!token) {
      return true;
    }
    // use jwtDecode to check the token expiry
    try {
      const decoded: any = jwtDecode(token as string);
      const exp = decoded?.exp;
      if (!exp || typeof exp !== 'number') {
        return true;
      }
      const now = Math.floor(Date.now() / 1000);
      return exp <= now;
    } catch {
      return true;
    }
  }
}
