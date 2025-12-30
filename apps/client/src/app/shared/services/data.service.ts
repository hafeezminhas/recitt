import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { delay, Observable } from 'rxjs';

const { apiPrefix, apiMockDelay = 0 } = environment;

export interface HttpOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?: HttpParams | Record<string, string>;
  responseType?: 'json';
  observe?: 'body';
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData<T>(
    endpoint: string,
    options?: Record<string, string>
  ): Observable<T> {
    const headers = options ? new HttpHeaders(options) : undefined;
    if (headers) {
      return this.http.get<T>(`${apiPrefix}/${endpoint}`, { headers });
    }

    return this.http
      .get<T>(`${apiPrefix}/${endpoint}`)
      .pipe(delay(apiMockDelay));
  }

  postData<T, R>(
    endpoint: string,
    payload: T,
    headers?: HttpHeaders
  ): Observable<R> {
    const options = headers ? { headers } : {};

    return this.http
      .post<R>(`${apiPrefix}/${endpoint}`, payload, options)
      .pipe(delay(apiMockDelay));
  }

  putData<T, R>(
    endpoint: string,
    data: T,
    headers?: HttpHeaders
  ): Observable<R> {
    const options = headers ? { headers } : {};

    return this.http
      .put<R>(`${apiPrefix}/${endpoint}`, data, options)
      .pipe(delay(apiMockDelay));
  }

  deleteData<T = any>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${apiPrefix}/${endpoint}`)
      .pipe(delay(apiMockDelay));
  }

  patchData<T, R>(
    endpoint: string,
    payload: T,
    headers?: HttpHeaders
  ): Observable<R> {
    const options = headers ? { headers } : {};

    return this.http
      .patch<R>(`${apiPrefix}/${endpoint}`, payload, options)
      .pipe(delay(apiMockDelay));
  }

  private buildHttpParams(paramsObj: { [param: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(paramsObj).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });
    return httpParams;
  }
}
