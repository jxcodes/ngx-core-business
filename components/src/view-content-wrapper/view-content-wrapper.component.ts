/**
 * Permite factorizar funcionalidad común en todas las páginas del del módulo de administración.
 *
 * @author Jaime Cruz.
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngbiz-view-content-wrapper',
  templateUrl: './view-content-wrapper.component.html',
  styleUrls: ['./view-content-wrapper.component.scss'],
})
export class ViewContentWrapperComponent {

  @Input() view: any;

}
