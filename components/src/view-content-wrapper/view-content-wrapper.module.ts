import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgBizDataErrorViewModule } from "../data-error-view";
import { NgBizProgressViewModule } from "../progress-view";

import { ViewContentWrapperComponent } from "./view-content-wrapper.component";

@NgModule({
  declarations: [
    ViewContentWrapperComponent,
  ],
  imports: [
    CommonModule,
    NgBizDataErrorViewModule,
    NgBizProgressViewModule,
  ],
  exports: [
    ViewContentWrapperComponent,
  ],
})
export class NgBizViewContentWrapperModule { }
