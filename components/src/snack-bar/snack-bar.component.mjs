import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
class SnackBarComponent {
    constructor(data, snackBar) {
        this.data = data;
        this.snackBar = snackBar;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: SnackBarComponent, deps: [{ token: MAT_SNACK_BAR_DATA }, { token: i1.MatSnackBar }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.2", type: SnackBarComponent, selector: "ng-component", ngImport: i0, template: "<div [innerHTML]=\"data.html\"></div>\r\n<div *ngIf=\"data.action\" class=\"text-right\">\r\n  <button mat-button (click)=\"snackBar.dismiss()\">{{data.action}}</button>\r\n</div>\r\n", styles: [""] }); }
}
export { SnackBarComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: SnackBarComponent, decorators: [{
            type: Component,
            args: [{ template: "<div [innerHTML]=\"data.html\"></div>\r\n<div *ngIf=\"data.action\" class=\"text-right\">\r\n  <button mat-button (click)=\"snackBar.dismiss()\">{{data.action}}</button>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_SNACK_BAR_DATA]
                }] }, { type: i1.MatSnackBar }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNuYWNrLWJhci5jb21wb25lbnQudHMiLCJzbmFjay1iYXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGtCQUFrQixFQUFlLE1BQU0sNkJBQTZCLENBQUM7OztBQUU5RSxNQUlhLGlCQUFpQjtJQUM1QixZQUNxQyxJQUFTLEVBQ3JDLFFBQXFCO1FBRE8sU0FBSSxHQUFKLElBQUksQ0FBSztRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFhO0lBQzFCLENBQUM7OEdBSk0saUJBQWlCLGtCQUVsQixrQkFBa0I7a0dBRmpCLGlCQUFpQixvRENQOUIseUxBSUE7O1NER2EsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBSjdCLFNBQVM7OzswQkFNTCxNQUFNOzJCQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1BVF9TTkFDS19CQVJfREFUQSwgTWF0U25hY2tCYXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NuYWNrLWJhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc25hY2stYmFyLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbmFja0JhckNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KE1BVF9TTkFDS19CQVJfREFUQSkgcHVibGljIGRhdGE6IGFueSxcclxuICAgIHB1YmxpYyBzbmFja0JhcjogTWF0U25hY2tCYXJcclxuICApIHsgfVxyXG59XHJcbiIsIjxkaXYgW2lubmVySFRNTF09XCJkYXRhLmh0bWxcIj48L2Rpdj5cclxuPGRpdiAqbmdJZj1cImRhdGEuYWN0aW9uXCIgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+XHJcbiAgPGJ1dHRvbiBtYXQtYnV0dG9uIChjbGljayk9XCJzbmFja0Jhci5kaXNtaXNzKClcIj57e2RhdGEuYWN0aW9ufX08L2J1dHRvbj5cclxuPC9kaXY+XHJcbiJdfQ==