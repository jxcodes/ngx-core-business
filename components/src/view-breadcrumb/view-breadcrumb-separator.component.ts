import { Component } from '@angular/core';

@Component({
    selector: 'ngbiz-view-breadcrumb-separator',
    template: `&#10095;`,
    styles: [`
    :host {
      margin: 0 8px;
      line-height: 1;
      padding-top: 1px;
    }
  `],
    standalone: false
})
export class ViewBreadcrumbSeparatorComponent {

}
