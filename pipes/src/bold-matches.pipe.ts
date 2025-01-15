import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'boldMatches',
    standalone: false
})
export class BoldMatchesPipe implements PipeTransform {
  transform(value: string, search: string): string {
    if (!search) {
      return value;
    }
    const re = new RegExp(search, 'gi');
    return value.replace(re, (match) => `<b>${match}</b>`);
  }
}
