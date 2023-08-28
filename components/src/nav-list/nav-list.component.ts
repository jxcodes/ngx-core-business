import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavItemModel } from './nav-item.model';
@Component({
  selector: 'ngbiz-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
})
export class NavListComponent {
  @Input()
  sidenav!: MatSidenav;
  @Input()
  items: NavItemModel[] = [];
  onItemClick() {
    if (this.sidenav?.mode === 'over') {
      this.sidenav.close();
    }
  }
}
