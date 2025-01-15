import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'clickableLinks',
    standalone: false
})
export class ClickableLinksPipe implements PipeTransform {
  transform(value: string) {
    // Convertir urls a links
    return value.replace(/\b(https?:\/\/[\S]+[\w])/gi, '<a href="$1" target="_blank">$1</a>');
  }
}
