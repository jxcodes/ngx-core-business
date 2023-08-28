import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatIconModule } from '@angular/material/icon';

import { EditionPinComponent } from "./edition-pin.component";

@NgModule({
  declarations: [
    EditionPinComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    EditionPinComponent,
  ],
})
export class NgBizEditionPinModule { }
