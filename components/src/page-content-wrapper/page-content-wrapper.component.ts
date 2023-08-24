/**
 * Permite factorizar funcionalidad común en todas las páginas del del módulo de administración.
 *
 * @author Jaime Cruz.
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngbiz-page-content-wrapper',
  templateUrl: './page-content-wrapper.component.html',
  styleUrls: ['./page-content-wrapper.component.scss'],
  host: { class: 'v-box' },
})
export class PageContentWrapperComponent {

  @Input() page: any;

}
