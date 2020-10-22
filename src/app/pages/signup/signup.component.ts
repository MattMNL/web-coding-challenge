import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { SignupUser } from '../../models/signup-user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { noFirstOrLastNameInPasswordValidator } from '../../validators/no-name-password.validator';

const PASSWORD_MINLENGTH = 8;
const PASSWORD_REGEX = `^(?=.*?[A-Z])(?=.*?[a-z]).{0,}$`;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  signupForm: FormGroup;
  signupFormSubmitted = false;

  passwordMinlength = PASSWORD_MINLENGTH;

  get emailControlErrors(): ValidationErrors {
    return this.signupForm.get('email').errors;
  }

  get passwordControlErrors(): ValidationErrors {
    return this.signupForm.get('password').errors;
  }

  get signupFormValue(): SignupUser {
    return this.signupForm.value;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.createSignupForm();
  }

  private createSignupForm(): void {
    this.signupForm = this.fb.group(
      {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(PASSWORD_MINLENGTH),
            Validators.pattern(PASSWORD_REGEX),
          ],
        ],
      },
      { validators: [noFirstOrLastNameInPasswordValidator] }
    );
  }

  onSignupFormSubmit(): void {
    this.signupFormSubmitted = true;

    this.authService
      .signup(this.signupFormValue)
      .subscribe(() => this.signupForm.disable());
  }
}
