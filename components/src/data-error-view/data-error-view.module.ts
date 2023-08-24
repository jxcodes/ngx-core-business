import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { DataErrorViewComponent } from "./data-error-view.component";

@NgModule({
  declarations: [
    DataErrorViewComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    DataErrorViewComponent,
  ],
})
export class NgBizDataErrorViewModule { }
