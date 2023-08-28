import { Injectable } from '@angular/core';
import { ProcessMaskComponent } from '../process-mask';
import { SnackBarComponent } from '../snack-bar';
import { XhrInfo } from './xhr-info';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
import * as i2 from "@angular/material/dialog";
class NotificationsService {
    constructor(_snackBar, matDialog) {
        this._snackBar = _snackBar;
        this.matDialog = matDialog;
        this.http_server_message_tpl = `
  <p style="max-width: 360px;">
    CITES - PERÚ<br>
    <i>{message}</i>
  </p>
  <small><small>ERROR {status}</small></small>`;
    }
    handleXhrError(xhr, cmp) {
        const me = this, defaultMessageStatuses = [
            0,
            404,
            500, // Server error
        ], status = xhr.status;
        let finalMessage;
        me.logXhr(xhr);
        // Defaul
        if (defaultMessageStatuses.indexOf(status) != -1) {
            me.showDefaultMessage(status);
            return;
        }
        // No server response
        if (status === undefined || status === null) {
            me.noServerResponse();
            return;
        }
        // Authentication Required
        if (status == 401 && cmp && cmp.__forceClose) {
            cmp.__forceClose();
            return;
        }
        // Authentication Required/Como login.redirect.interceptor.ts redirecciona a login,
        // No es necesario mostrar el mensaje de error.
        if (status == 401) {
            return;
        }
        // Autenticación requerida: 401
        if (status == 400) {
            const error = xhr.error.toString() == '[object Object]' ? xhr.error : {};
            const messageType = status == 400 ? 'warning' : 'danger';
            // Show server message
            if (error.message) {
                finalMessage = me.http_server_message_tpl
                    .replace('{message}', error.message)
                    .replace('{status}', status);
                me.showSnack(finalMessage, messageType);
                return;
            }
            me.showDefaultMessage(status);
            return;
        }
        me.showDefaultMessage(status);
    }
    showSnack(message, type) {
        this._snackBar.openFromComponent(SnackBarComponent, {
            panelClass: this.getSnackClass(type),
            data: {
                html: message,
            },
            duration: 2000,
            verticalPosition: 'top', // 'top' | 'bottom'
        });
    }
    mask(message) {
        return this.matDialog.open(ProcessMaskComponent, {
            disableClose: true,
            data: {
                message,
            },
        });
    }
    snackSuccess(message) {
        this._snackBar.openFromComponent(SnackBarComponent, {
            panelClass: this.getSnackClass('success'),
            data: {
                html: message,
            },
            duration: 2000,
            verticalPosition: 'top', // 'top' | 'bottom'
        });
    }
    snackDanger(message) {
        this._snackBar.openFromComponent(SnackBarComponent, {
            panelClass: this.getSnackClass('danger'),
            data: {
                html: message,
            },
            duration: 2000,
            verticalPosition: 'top', // 'top' | 'bottom'
        });
    }
    snackWarning(message) {
        this._snackBar.openFromComponent(SnackBarComponent, {
            panelClass: this.getSnackClass('warning'),
            data: {
                html: message,
            },
            duration: 2000,
            verticalPosition: 'top', // 'top' | 'bottom'
        });
    }
    snackInfo(message) {
        this._snackBar.openFromComponent(SnackBarComponent, {
            panelClass: this.getSnackClass('info'),
            data: {
                html: message,
            },
            duration: 2000,
            verticalPosition: 'top', // 'top' | 'bottom'
        });
    }
    getSnackClass(type) {
        const map = {
            warning: ['bg-warning', 'text-dark'],
            danger: ['bg-danger', 'text-white'],
            info: ['bg-info', 'text-white'],
            success: ['bg-success', 'text-white'],
        };
        return map[type];
    }
    logXhr(xhr) {
        console.error(xhr);
    }
    noInternet() {
        this.showDefaultMessage(0);
    }
    noServerResponse() {
        this.showDefaultMessage(503);
    }
    serverUnauthorized() {
        this.showDefaultMessage(401);
    }
    showDefaultMessage(status) {
        this._snackBar.open(XhrInfo.getStatusMessage(status), 'ACEPTAR', {
            verticalPosition: 'top',
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: NotificationsService, deps: [{ token: i1.MatSnackBar }, { token: i2.MatDialog }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: NotificationsService, providedIn: 'root' }); }
}
export { NotificationsService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: NotificationsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.MatSnackBar }, { type: i2.MatDialog }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm90aWZpY2F0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWpELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7QUFFckMsTUFHYSxvQkFBb0I7SUFPL0IsWUFBb0IsU0FBc0IsRUFBVSxTQUFvQjtRQUFwRCxjQUFTLEdBQVQsU0FBUyxDQUFhO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQU54RSw0QkFBdUIsR0FBRzs7Ozs7K0NBS21CLENBQUM7SUFDOEIsQ0FBQztJQUM3RSxjQUFjLENBQUMsR0FBeUIsRUFBRSxHQUFTO1FBQ2pELE1BQU0sRUFBRSxHQUFHLElBQUksRUFDYixzQkFBc0IsR0FBRztZQUN2QixDQUFDO1lBQ0QsR0FBRztZQUNILEdBQUcsRUFBRSxlQUFlO1NBQ3JCLEVBQ0QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDdEIsSUFBSSxZQUFZLENBQUM7UUFDakIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLFNBQVM7UUFDVCxJQUFJLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNoRCxFQUFFLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsT0FBTztTQUNSO1FBQ0QscUJBQXFCO1FBQ3JCLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQzNDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RCLE9BQU87U0FD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QUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRTtZQUMvRCxnQkFBZ0IsRUFBRSxLQUFLO1NBQ3hCLENBQUMsQ0FBQztJQUNMLENBQUM7OEdBM0lVLG9CQUFvQjtrSEFBcEIsb0JBQW9CLGNBRm5CLE1BQU07O1NBRVAsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyBNYXRTbmFja0JhciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XHJcbmltcG9ydCB7IEh0dHBTdGF0dXNDb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBQcm9jZXNzTWFza0NvbXBvbmVudCB9IGZyb20gJy4uL3Byb2Nlc3MtbWFzayc7XHJcbmltcG9ydCB7IFNuYWNrQmFyQ29tcG9uZW50IH0gZnJvbSAnLi4vc25hY2stYmFyJztcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICcuL21lc3NhZ2UudHlwZSc7XHJcbmltcG9ydCB7IFhockluZm8gfSBmcm9tICcuL3hoci1pbmZvJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbnNTZXJ2aWNlIHtcclxuICBodHRwX3NlcnZlcl9tZXNzYWdlX3RwbCA9IGBcclxuICA8cCBzdHlsZT1cIm1heC13aWR0aDogMzYwcHg7XCI+XHJcbiAgICBDSVRFUyAtIFBFUsOaPGJyPlxyXG4gICAgPGk+e21lc3NhZ2V9PC9pPlxyXG4gIDwvcD5cclxuICA8c21hbGw+PHNtYWxsPkVSUk9SIHtzdGF0dXN9PC9zbWFsbD48L3NtYWxsPmA7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc25hY2tCYXI6IE1hdFNuYWNrQmFyLCBwcml2YXRlIG1hdERpYWxvZzogTWF0RGlhbG9nKSB7IH1cclxuICBoYW5kbGVYaHJFcnJvcih4aHI6IFhNTEh0dHBSZXF1ZXN0IHwgYW55LCBjbXA/OiBhbnkpIHtcclxuICAgIGNvbnN0IG1lID0gdGhpcyxcclxuICAgICAgZGVmYXVsdE1lc3NhZ2VTdGF0dXNlcyA9IFtcclxuICAgICAgICAwLCAvLyBObyBpbnRlcm5ldFxyXG4gICAgICAgIDQwNCwgLy8gU2VydmljaW8gbm8gZW5jb250cmFkb1xyXG4gICAgICAgIDUwMCwgLy8gU2VydmVyIGVycm9yXHJcbiAgICAgIF0sXHJcbiAgICAgIHN0YXR1cyA9IHhoci5zdGF0dXM7XHJcbiAgICBsZXQgZmluYWxNZXNzYWdlO1xyXG4gICAgbWUubG9nWGhyKHhocik7XHJcbiAgICAvLyBEZWZhdWxcclxuICAgIGlmIChkZWZhdWx0TWVzc2FnZVN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSAhPSAtMSkge1xyXG4gICAgICBtZS5zaG93RGVmYXVsdE1lc3NhZ2Uoc3RhdHVzKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gTm8gc2VydmVyIHJlc3BvbnNlXHJcbiAgICBpZiAoc3RhdHVzID09PSB1bmRlZmluZWQgfHwgc3RhdHVzID09PSBudWxsKSB7XHJcbiAgICAgIG1lLm5vU2VydmVyUmVzcG9uc2UoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gQXV0aGVudGljYXRpb24gUmVxdWlyZWRcclxuICAgIGlmIChzdGF0dXMgPT0gNDAxICYmIGNtcCAmJiBjbXAuX19mb3JjZUNsb3NlKSB7XHJcbiAgICAgIGNtcC5fX2ZvcmNlQ2xvc2UoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gQXV0aGVudGljYXRpb24gUmVxdWlyZWQvQ29tbyBsb2dpbi5yZWRpcmVjdC5pbnRlcmNlcHRvci50cyByZWRpcmVjY2lvbmEgYSBsb2dpbixcclxuICAgIC8vIE5vIGVzIG5lY2VzYXJpbyBtb3N0cmFyIGVsIG1lbnNhamUgZGUgZXJyb3IuXHJcbiAgICBpZiAoc3RhdHVzID09IDQwMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyBBdXRlbnRpY2FjacOzbiByZXF1ZXJpZGE6IDQwMVxyXG5cclxuICAgIGlmIChzdGF0dXMgPT0gNDAwKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0geGhyLmVycm9yLnRvU3RyaW5nKCkgPT0gJ1tvYmplY3QgT2JqZWN0XScgPyB4aHIuZXJyb3IgOiB7fTtcclxuICAgICAgY29uc3QgbWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlID0gc3RhdHVzID09IDQwMCA/ICd3YXJuaW5nJyA6ICdkYW5nZXInO1xyXG4gICAgICAvLyBTaG93IHNlcnZlciBtZXNzYWdlXHJcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XHJcbiAgICAgICAgZmluYWxNZXNzYWdlID0gbWUuaHR0cF9zZXJ2ZXJfbWVzc2FnZV90cGxcclxuICAgICAgICAgIC5yZXBsYWNlKCd7bWVzc2FnZX0nLCBlcnJvci5tZXNzYWdlKVxyXG4gICAgICAgICAgLnJlcGxhY2UoJ3tzdGF0dXN9Jywgc3RhdHVzKTtcclxuICAgICAgICBtZS5zaG93U25hY2soZmluYWxNZXNzYWdlLCBtZXNzYWdlVHlwZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIG1lLnNob3dEZWZhdWx0TWVzc2FnZShzdGF0dXMpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBtZS5zaG93RGVmYXVsdE1lc3NhZ2Uoc3RhdHVzKTtcclxuICB9XHJcbiAgc2hvd1NuYWNrKG1lc3NhZ2U6IHN0cmluZywgdHlwZTogTWVzc2FnZVR5cGUpIHtcclxuICAgIHRoaXMuX3NuYWNrQmFyLm9wZW5Gcm9tQ29tcG9uZW50KFNuYWNrQmFyQ29tcG9uZW50LCB7XHJcbiAgICAgIHBhbmVsQ2xhc3M6IHRoaXMuZ2V0U25hY2tDbGFzcyh0eXBlKSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGh0bWw6IG1lc3NhZ2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICB2ZXJ0aWNhbFBvc2l0aW9uOiAndG9wJywgLy8gJ3RvcCcgfCAnYm90dG9tJ1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIG1hc2sobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXREaWFsb2cub3BlbihQcm9jZXNzTWFza0NvbXBvbmVudCwge1xyXG4gICAgICBkaXNhYmxlQ2xvc2U6IHRydWUsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBtZXNzYWdlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHNuYWNrU3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3NuYWNrQmFyLm9wZW5Gcm9tQ29tcG9uZW50KFNuYWNrQmFyQ29tcG9uZW50LCB7XHJcbiAgICAgIHBhbmVsQ2xhc3M6IHRoaXMuZ2V0U25hY2tDbGFzcygnc3VjY2VzcycpLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgaHRtbDogbWVzc2FnZSxcclxuICAgICAgfSxcclxuICAgICAgZHVyYXRpb246IDIwMDAsXHJcbiAgICAgIHZlcnRpY2FsUG9zaXRpb246ICd0b3AnLCAvLyAndG9wJyB8ICdib3R0b20nXHJcbiAgICB9KTtcclxuICB9XHJcbiAgc25hY2tEYW5nZXIobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9zbmFja0Jhci5vcGVuRnJvbUNvbXBvbmVudChTbmFja0JhckNvbXBvbmVudCwge1xyXG4gICAgICBwYW5lbENsYXNzOiB0aGlzLmdldFNuYWNrQ2xhc3MoJ2RhbmdlcicpLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgaHRtbDogbWVzc2FnZSxcclxuICAgICAgfSxcclxuICAgICAgZHVyYXRpb246IDIwMDAsXHJcbiAgICAgIHZlcnRpY2FsUG9zaXRpb246ICd0b3AnLCAvLyAndG9wJyB8ICdib3R0b20nXHJcbiAgICB9KTtcclxuICB9XHJcbiAgc25hY2tXYXJuaW5nKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5fc25hY2tCYXIub3BlbkZyb21Db21wb25lbnQoU25hY2tCYXJDb21wb25lbnQsIHtcclxuICAgICAgcGFuZWxDbGFzczogdGhpcy5nZXRTbmFja0NsYXNzKCd3YXJuaW5nJyksXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBodG1sOiBtZXNzYWdlLFxyXG4gICAgICB9LFxyXG4gICAgICBkdXJhdGlvbjogMjAwMCxcclxuICAgICAgdmVydGljYWxQb3NpdGlvbjogJ3RvcCcsIC8vICd0b3AnIHwgJ2JvdHRvbSdcclxuICAgIH0pO1xyXG4gIH1cclxuICBzbmFja0luZm8obWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9zbmFja0Jhci5vcGVuRnJvbUNvbXBvbmVudChTbmFja0JhckNvbXBvbmVudCwge1xyXG4gICAgICBwYW5lbENsYXNzOiB0aGlzLmdldFNuYWNrQ2xhc3MoJ2luZm8nKSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGh0bWw6IG1lc3NhZ2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICB2ZXJ0aWNhbFBvc2l0aW9uOiAndG9wJywgLy8gJ3RvcCcgfCAnYm90dG9tJ1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0U25hY2tDbGFzcyh0eXBlOiBNZXNzYWdlVHlwZSkge1xyXG4gICAgY29uc3QgbWFwID0ge1xyXG4gICAgICB3YXJuaW5nOiBbJ2JnLXdhcm5pbmcnLCAndGV4dC1kYXJrJ10sXHJcbiAgICAgIGRhbmdlcjogWydiZy1kYW5nZXInLCAndGV4dC13aGl0ZSddLFxyXG4gICAgICBpbmZvOiBbJ2JnLWluZm8nLCAndGV4dC13aGl0ZSddLFxyXG4gICAgICBzdWNjZXNzOiBbJ2JnLXN1Y2Nlc3MnLCAndGV4dC13aGl0ZSddLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBtYXBbdHlwZV07XHJcbiAgfVxyXG4gIHByaXZhdGUgbG9nWGhyKHhocjogWE1MSHR0cFJlcXVlc3QpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoeGhyKTtcclxuICB9XHJcbiAgbm9JbnRlcm5ldCgpIHtcclxuICAgIHRoaXMuc2hvd0RlZmF1bHRNZXNzYWdlKDApO1xyXG4gIH1cclxuICBub1NlcnZlclJlc3BvbnNlKCkge1xyXG4gICAgdGhpcy5zaG93RGVmYXVsdE1lc3NhZ2UoNTAzKTtcclxuICB9XHJcbiAgc2VydmVyVW5hdXRob3JpemVkKCkge1xyXG4gICAgdGhpcy5zaG93RGVmYXVsdE1lc3NhZ2UoNDAxKTtcclxuICB9XHJcbiAgc2hvd0RlZmF1bHRNZXNzYWdlKHN0YXR1czogSHR0cFN0YXR1c0NvZGUgfCAwKSB7XHJcbiAgICB0aGlzLl9zbmFja0Jhci5vcGVuKFhockluZm8uZ2V0U3RhdHVzTWVzc2FnZShzdGF0dXMpLCAnQUNFUFRBUicsIHtcclxuICAgICAgdmVydGljYWxQb3NpdGlvbjogJ3RvcCcsXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19