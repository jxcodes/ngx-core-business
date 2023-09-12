import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatIconModule } from '@angular/material/icon';

import { AvatarComponent } from "./avatar.component";

@NgModule({
  declarations: [
    AvatarComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    AvatarComponent,
  ],
})
export class NgBizAvatarModule { }
