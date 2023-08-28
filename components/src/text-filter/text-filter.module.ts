import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MatIconModule } from '@angular/material/icon';

import { TextFilterComponent } from "./text-filter.component";

@NgModule({
  declarations: [
    TextFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [
    TextFilterComponent,
  ],
})
export class NgBizTextFilterModule { }
