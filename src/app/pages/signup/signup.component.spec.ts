import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupUser } from 'src/app/models/signup-user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let authenticationService: AuthenticationService;
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [SignupComponent],
    }).compileComponents();

    authenticationService = TestBed.inject(AuthenticationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the signup form', () => {
    expect(component.signupForm).not.toBeUndefined();
  });

  it('should be able to submit a valid filled form', () => {
    const signupSpy = spyOn(authenticationService, 'signup').and.callThrough();

    const mockSignupUser: SignupUser = {
      firstName: 'Joe',
      lastName: 'Joseph',
      email: 'joe@google.com',
      password: '12345Abcde',
    };

    component.signupForm.setValue(mockSignupUser);
    component.signupForm.updateValueAndValidity();

    expect(component.signupForm.valid).toBeTrue();

    component.onSignupFormSubmit();

    expect(signupSpy).toHaveBeenCalled();

    expect(component.signupFormSubmitted).toBeTrue();
  });
});
