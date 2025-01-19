import { Component, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { NavItemModel } from "./nav-item.model";
import { NavigationEnd, Router } from "@angular/router";
@Component({
  selector: "ngbiz-nav-list",
  templateUrl: "./nav-list.component.html",
  styleUrls: ["./nav-list.component.scss"],
  standalone: false,
})
export class NavListComponent implements OnInit {
  @Input()
  sidenav!: MatSidenav;
  @Input()
  items: NavItemModel[] = [];
  @Input() activeItemId?: number | string;
  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  currentRoute: string = "";

  onItemClick() {
    if (this.sidenav?.mode === "over") {
      this.sidenav.close();
    }
  }
  isActive(item: NavItemModel) {
    if (this.activeItemId) {
      return this.activeItemId === item.id;
    }
    let route = item.route;
    // Add / if it is not present
    if (route && route[0] !== "/") {
      route = "/" + route;
    }
    // Remove query params
    route = route?.split("?")[0];
    return this.currentRoute === route;
  }

  parseRoute(route: string) {
    return route[0] === "/" ? route : "/" + route;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        // remove query params
        this.currentRoute = this.currentRoute.split("?")[0];
      }
    });
  }
  ngAfterViewInit() {
    // Remove padding from mat-expansion-panel-body
    const targetElement = this.el.nativeElement.querySelector(
      ".mat-expansion-panel-body"
    );
    if (targetElement) {
      this.renderer.setStyle(targetElement, "padding", "0");
    }
  }
}
