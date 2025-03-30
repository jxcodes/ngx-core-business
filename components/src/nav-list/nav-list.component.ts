import {
  AfterViewChecked,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavItem } from './nav-item.type';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'ngbiz-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
  standalone: false,
})
export class NavListComponent implements OnInit, AfterViewChecked {
  @Input() sidenav!: MatSidenav;
  @Input() items: NavItem[] = [];
  @Input() activeItemId?: number | string;

  // Capture optional templates
  @ContentChild('item') itemTemplate?: TemplateRef<any>;
  @ContentChild('itemIcon') itemIconTemplate?: TemplateRef<any>;
  @ContentChild('itemText') itemTextTemplate?: TemplateRef<any>;

  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  currentRoute: string = '';

  onItemClick() {
    if (this.sidenav?.mode === 'over') {
      this.sidenav.close();
    }
  }

  isActive(item: NavItem) {
    if (this.activeItemId) {
      return this.activeItemId === item.id;
    }
    let route = item.route;
    // Add / if it is not present
    if (route && route[0] !== '/') {
      route = '/' + route;
    }
    // Remove query params
    route = route?.split('?')[0];
    return this.currentRoute === route;
  }

  parseRoute(route: string) {
    return route[0] === '/' ? route : '/' + route;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        // remove query params
        this.currentRoute = this.currentRoute.split('?')[0];
      }
    });
  }

  ngAfterViewChecked() {
    this.removeExpansionPanelPadding();
  }

  private removeExpansionPanelPadding() {
    const panels = this.el.nativeElement.querySelectorAll(
      '.mat-expansion-panel-body'
    );
    panels.forEach((panel: HTMLElement) => {
      this.renderer.setStyle(panel, 'padding', '0');
    });
  }
}
