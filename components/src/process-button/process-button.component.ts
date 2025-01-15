import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ngbiz-process-button',
    templateUrl: './process-button.component.html',
    styleUrls: ['./process-button.component.scss'],
    standalone: false
})
export class ProcessButtonComponent {
  @Input() text!: string;
  @Input() submit: boolean = true;
  @Input() icon!: string;
  @Input() rounded: boolean = false;
  @Input() activeProcess: boolean = false;
  @Input() disabled: boolean = false;
  @Input() activeProcessText!: string;
  @Input() color: string = 'primary';
  @Output() onButtonClick = new EventEmitter();
}
