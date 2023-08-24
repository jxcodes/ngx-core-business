import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";

import { DialogComponent } from "./dialog.component";
@NgModule({
  declarations: [
    DialogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    DialogComponent,
  ],
})
export class NgBizDialogModule { }
