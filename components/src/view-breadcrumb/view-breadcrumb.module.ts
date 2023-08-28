import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ViewBreadcrumbComponent } from "./view-breadcrumb.component";
import { ViewBreadcrumbSeparatorComponent } from "./view-breadcrumb-separator.component";

@NgModule({
  declarations: [
    ViewBreadcrumbComponent,
    ViewBreadcrumbSeparatorComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ViewBreadcrumbComponent,
    ViewBreadcrumbSeparatorComponent,
  ],
})
export class NgBizBreadcrumbModule { }
