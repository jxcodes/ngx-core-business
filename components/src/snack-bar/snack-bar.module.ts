import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SnackBarComponent } from "./snack-bar.component";

@NgModule({
  declarations: [
    SnackBarComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [
    SnackBarComponent,
  ]
})
export class NgBizSnackBarModule { }
