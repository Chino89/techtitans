import { AbstractControl } from '@angular/forms';

export class MyValidators {
  static matchPasswords(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { match_password: true };
    }
  }
}
