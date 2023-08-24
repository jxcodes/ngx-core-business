import { NgModule } from "@angular/core";

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ProgressViewComponent } from "./progress-view.component";

@NgModule({
  declarations: [
    ProgressViewComponent,
  ],
  imports: [
    MatProgressBarModule,
  ],
  exports: [
    ProgressViewComponent,
  ],
})
export class NgBizProgressViewModule { }
