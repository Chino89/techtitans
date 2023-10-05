import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleCustomizer',
})
export class RoleCustomizerPipe implements PipeTransform {
  transform(value: string[], ...args: unknown[]): string {
    if (!Array.isArray(value) || value.length === 0) {
      return '';
    }

    const role = value[0];
    if (typeof role !== 'string') {
      return '';
    }

    const parts = role.split('_');

    if (parts.length !== 2 || parts[0] !== 'ROLE') {
      return role;
    }

    const formattedRole =
      parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase();

    return formattedRole;
  }
}
