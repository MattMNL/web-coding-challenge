import {
  ValidatorFn,
  FormGroup,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

export const noFirstOrLastNameInPasswordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const firstName = control.get('firstName');
  const lastName = control.get('lastName');
  const password = control.get('password');

  let error = null;

  if (passwordIncludesFirstOrLastName(firstName, lastName, password)) {
    error = { passwordContainsFirstOrLastName: true };

    password.setErrors({
      ...password.errors,
      ...error,
    });
  }

  return error;
};

function passwordIncludesFirstOrLastName(
  firstName: AbstractControl,
  lastName: AbstractControl,
  password: AbstractControl
): boolean {
  return (
    firstName &&
    lastName &&
    password?.value &&
    (password.value.toLowerCase().includes(firstName.value.toLowerCase()) ||
      password.value.toLowerCase().includes(lastName.value.toLowerCase()))
  );
}
