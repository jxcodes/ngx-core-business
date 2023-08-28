import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatIconModule } from '@angular/material/icon';

import { ProcessButtonComponent } from "./process-button.component";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    ProcessButtonComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ProcessButtonComponent,
  ],
})
export class NgBizProcessButtonModule { }
