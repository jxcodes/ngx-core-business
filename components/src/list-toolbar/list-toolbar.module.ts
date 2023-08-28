import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";



import { ListToolbarComponent } from "./list-toolbar.component";
import { NgBizTextFilterModule } from "../text-filter";

@NgModule({
  declarations: [
    ListToolbarComponent,
  ],
  imports: [
    CommonModule,
    NgBizTextFilterModule,
  ],
  exports: [
    ListToolbarComponent,
  ],
})
export class NgBizListToolbarModule { }
