import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GridComponent } from "./grid.component";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    GridComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
  ],
  exports: [
    GridComponent,
  ],
})
export class NgBizGridModule { }
