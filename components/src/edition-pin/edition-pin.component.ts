import { Component, Input } from '@angular/core';
@Component({
    selector: 'ngbiz-edition-pin',
    templateUrl: './edition-pin.component.html',
    styleUrls: ['./edition-pin.component.scss'],
    standalone: false
})
export class EditionPinComponent {
  @Input() icon!: string;
}
