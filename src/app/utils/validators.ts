import { AbstractControl, FormControl } from '@angular/forms';

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

  static requiredFileType(file: Blob, type: string = 'png') {
    const validTypes = [
      'jpg',
      'jpeg',
      'png',
      'gif',
      'webp',
      'avif',
      'svg',
      'bmp',
    ];
    const extension = file.name.split('.')[1].toLowerCase();
    const isValid = validTypes.includes(extension.toLowerCase());
    return isValid;
  }

  static validDate(control: AbstractControl) {
    const actualDate = new Date().toISOString().split('T')[0];
    const date = control.get('dia')?.value;

    if (date > actualDate) {
      return null;
    } else {
      return { invalid_date: true };
    }
  }
}
