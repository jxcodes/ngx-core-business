import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ngbiz-progress-view',
  templateUrl: './progress-view.component.html',
  styleUrls: ['./progress-view.component.scss'],
  host: { class: 'container-center' },
})
export class ProgressViewComponent {
  @Input() text: string = 'Cargando...';
  @HostBinding('style.z-index')
  @Input() zIndex: number = 1000;
}
