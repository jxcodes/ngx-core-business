import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from "./snack-bar.component";
let NgBizSnackBarModule = class NgBizSnackBarModule {
};
NgBizSnackBarModule = __decorate([
    NgModule({
        declarations: [
            SnackBarComponent,
        ],
        imports: [
            MatButtonModule,
            MatSnackBarModule,
        ],
        exports: [
            SnackBarComponent,
        ]
    })
], NgBizSnackBarModule);
export { NgBizSnackBarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNuYWNrLWJhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWhFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBYzFELElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0NBQUksQ0FBQTtBQUF2QixtQkFBbUI7SUFaL0IsUUFBUSxDQUFDO1FBQ1IsWUFBWSxFQUFFO1lBQ1osaUJBQWlCO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsZUFBZTtZQUNmLGlCQUFpQjtTQUNsQjtRQUNELE9BQU8sRUFBRTtZQUNQLGlCQUFpQjtTQUNsQjtLQUNGLENBQUM7R0FDVyxtQkFBbUIsQ0FBSTtTQUF2QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xyXG5pbXBvcnQgeyBNYXRTbmFja0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XHJcblxyXG5pbXBvcnQgeyBTbmFja0JhckNvbXBvbmVudCB9IGZyb20gXCIuL3NuYWNrLWJhci5jb21wb25lbnRcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBTbmFja0JhckNvbXBvbmVudCxcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgU25hY2tCYXJDb21wb25lbnQsXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdCaXpTbmFja0Jhck1vZHVsZSB7IH1cclxuIl19