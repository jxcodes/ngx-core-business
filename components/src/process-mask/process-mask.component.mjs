import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
class ProcessMaskComponent {
    constructor(dialogRef, inputData) {
        this.dialogRef = dialogRef;
        this.inputData = inputData;
        this.message = '';
        const me = this;
        if (me.inputData) {
            me.message = me.inputData.message;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: ProcessMaskComponent, deps: [{ token: i1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.2", type: ProcessMaskComponent, selector: "ng-component", inputs: { message: "message" }, ngImport: i0, template: "<mat-spinner diameter=\"48\"></mat-spinner>\r\n<div class=\"message\">{{message}}</div>\r\n", styles: [":host{display:flex;justify-items:center;flex-direction:column;text-align:center}\n"] }); }
}
export { ProcessMaskComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: ProcessMaskComponent, decorators: [{
            type: Component,
            args: [{ template: "<mat-spinner diameter=\"48\"></mat-spinner>\r\n<div class=\"message\">{{message}}</div>\r\n", styles: [":host{display:flex;justify-items:center;flex-direction:column;text-align:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; }, propDecorators: { message: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy1tYXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2Nlc3MtbWFzay5jb21wb25lbnQudHMiLCJwcm9jZXNzLW1hc2suY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7OztBQUV6RSxNQUlhLG9CQUFvQjtJQUUvQixZQUNZLFNBQTZDLEVBQ3RCLFNBQWM7UUFEckMsY0FBUyxHQUFULFNBQVMsQ0FBb0M7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUh4QyxZQUFPLEdBQVcsRUFBRSxDQUFDO1FBSzVCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUU7WUFDaEIsRUFBRSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztTQUNuQztJQUNILENBQUM7OEdBVlUsb0JBQW9CLDhDQUlyQixlQUFlO2tHQUpkLG9CQUFvQixvRkNQakMsNkZBRUE7O1NES2Esb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBSmhDLFNBQVM7OzswQkFRTCxNQUFNOzJCQUFDLGVBQWU7NENBSGhCLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vcHJvY2Vzcy1tYXNrLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9wcm9jZXNzLW1hc2suY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2Nlc3NNYXNrQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBtZXNzYWdlOiBzdHJpbmcgPSAnJztcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxQcm9jZXNzTWFza0NvbXBvbmVudD4sXHJcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHJpdmF0ZSBpbnB1dERhdGE6IGFueVxyXG4gICkge1xyXG4gICAgY29uc3QgbWUgPSB0aGlzO1xyXG4gICAgaWYgKG1lLmlucHV0RGF0YSkge1xyXG4gICAgICBtZS5tZXNzYWdlID0gbWUuaW5wdXREYXRhLm1lc3NhZ2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIjxtYXQtc3Bpbm5lciBkaWFtZXRlcj1cIjQ4XCI+PC9tYXQtc3Bpbm5lcj5cclxuPGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj57e21lc3NhZ2V9fTwvZGl2PlxyXG4iXX0=