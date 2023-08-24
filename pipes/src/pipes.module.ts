import { NgModule } from "@angular/core";
import { BoldMatchesPipe } from "./bold-matches.pipe";
import { BreakLinesPipe } from "./break-lines.pipe";
import { SafeHtmlPipe } from "./safe-html.pipe";
import { ClickableLinksPipe } from "./clickable-links.pipe";



@NgModule({
  declarations: [
    BoldMatchesPipe,
    BreakLinesPipe,
    ClickableLinksPipe,
    SafeHtmlPipe,
  ],
  exports: [
    BoldMatchesPipe,
    BreakLinesPipe,
    ClickableLinksPipe,
    SafeHtmlPipe,
  ]
})
export class NgBizPipesModule { }
