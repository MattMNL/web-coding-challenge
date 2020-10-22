import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';
import { SignupUser } from '../models/signup-user.model';

describe('AuthenticationService', () => {
  let httpMock: HttpTestingController;
  let authenticationService: AuthenticationService;
  let testBed: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    testBed = getTestBed();
    httpMock = testBed.inject(HttpTestingController);
    authenticationService = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('should be able to POST a new user signup', () => {
    const mockSignupUser: SignupUser = {
      firstName: 'Joe',
      lastName: 'Joseph',
      email: 'joe@google.com',
      password: '123abc',
    };

    const stubResponse = null;

    authenticationService.signup(mockSignupUser).subscribe();

    const request = httpMock.expectOne(AuthenticationService.URL_USERS);

    request.flush(stubResponse);

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(mockSignupUser);
  });
});
