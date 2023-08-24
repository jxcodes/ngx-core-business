import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgBizDataErrorViewModule } from "../data-error-view";
import { NgBizProgressViewModule } from "../progress-view";

import { PageContentWrapperComponent } from "./page-content-wrapper.component";

@NgModule({
  declarations: [
    PageContentWrapperComponent,
  ],
  imports: [
    CommonModule,
    NgBizDataErrorViewModule,
    NgBizProgressViewModule,
  ],
  exports: [
    PageContentWrapperComponent,
  ],
})
export class NgBizPageContentWrapperModule { }
