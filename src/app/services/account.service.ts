import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}

  token: { token: any };
  authenticated = false;

  login(email: string, password: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const obs = this.http.post(
      environment.baseUrl + '/auth/token',
      {
        email: email,
        password: password
      },
      { headers: headers }
    );
    return obs.pipe(
      map((value: any) => {
        const token = value.token;
        if (this._isTokenStillValid(token)) {
          this.authenticated = true;
          this.token = value;
          localStorage.setItem('token', token);
        } else {
          this.authenticated = false;
        }
        return value;
      })
    );
  }

  private getExpirationDate(token: string) {
    const split = token.split('.');
    const payloadBase64 = split[1];
    const payload = JSON.parse(atob(payloadBase64));
    const expirationDate = new Date(payload.exp * 1000);
    return expirationDate;
  }

  private _isTokenStillValid(token: string) {
    if (!token) return false;
    const now = new Date();
    return now < this.getExpirationDate(token);
  }

  public isTokenStillValid() {
    const token = this.token;
    if (!token) return false;
    return this._isTokenStillValid(token.token);
  }
}
