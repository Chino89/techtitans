import { AbstractControl } from '@angular/forms';

export class MyValidators {
  static matchPasswords(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirm_password = control.get('confirm_password')?.value;

    if (password === confirm_password) {
      return null;
    } else {
      return { match_password: true };
    }
  }
}
