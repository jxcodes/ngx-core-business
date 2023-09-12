import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppHeaderComponent } from "./app-header.component";
import { OverlayModule } from "@angular/cdk/overlay";

import { NgBizAvatarModule } from "../avatar";

@NgModule({
  declarations: [
    AppHeaderComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    NgBizAvatarModule,
  ],
  exports: [
    AppHeaderComponent,
  ],
})
export class NgBizAppHeaderModule { }
