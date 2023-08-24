import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatProgressBarModule } from "@angular/material/progress-bar";

import { HttpActivityBarComponent } from "./http-activity-bar.component";

@NgModule({
  declarations: [
    HttpActivityBarComponent,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],
  exports: [
    HttpActivityBarComponent,
  ],
})
export class NgBizHttpActivityModule { }
