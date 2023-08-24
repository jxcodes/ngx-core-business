import { NgModule } from "@angular/core";

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProcessMaskComponent } from "./process-mask.component";

@NgModule({
  declarations: [
    ProcessMaskComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
  ],
  exports: [
    ProcessMaskComponent,
  ],
})
export class NgBizProcessMaskModule { }
