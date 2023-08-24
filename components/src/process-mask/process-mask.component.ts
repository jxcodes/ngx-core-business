import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './process-mask.component.html',
  styleUrls: ['./process-mask.component.scss'],
  host: { class: 'text-center' },
})
export class ProcessMaskComponent {
  @Input() message: string = '';
  constructor(
    protected dialogRef: MatDialogRef<ProcessMaskComponent>,
    @Inject(MAT_DIALOG_DATA) private inputData: any
  ) {
    const me = this;
    if (me.inputData) {
      me.message = me.inputData.message;
    }
  }
}
