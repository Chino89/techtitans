import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeCustomizer',
})
export class TimeCustomizerPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (!value || typeof value !== 'string') {
      return value;
    }

    const parts = value.split(':');

    if (parts.length !== 3) {
      return value;
    }

    const formattedTime = `${parts[0]}:${parts[1]}`;

    return formattedTime;
  }
}
