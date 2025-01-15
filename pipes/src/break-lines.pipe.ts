import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'breakLines',
    standalone: false
})
export class BreakLinesPipe implements PipeTransform {
  transform(value: string) {
    // Añadir saltos de linea
    return value.replace(/\n/g, '<br>');
  }
}
