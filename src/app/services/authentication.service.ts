import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { SignupUser } from '../models/signup-user.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  static URL_USERS = `${environment.demoBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  signup(signupFormValue: SignupUser): Observable<unknown> {
    return this.http.post<SignupUser>(
      AuthenticationService.URL_USERS,
      signupFormValue
    );
  }
}
