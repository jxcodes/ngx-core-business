import { NgModule } from "@angular/core";

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SnackBarComponent } from "./snack-bar.component";

@NgModule({
  declarations: [
    SnackBarComponent,
  ],
  imports: [
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [
    SnackBarComponent,
  ]
})
export class NgBizSnackBarModule { }
