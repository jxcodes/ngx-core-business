import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpStatusCode } from '@angular/common/http';
import { ProcessMaskComponent } from '../process-mask';
import { MessageType } from './message.type';
import * as i0 from "@angular/core";
export declare class NotificationsService {
    private _snackBar;
    private matDialog;
    http_server_message_tpl: string;
    constructor(_snackBar: MatSnackBar, matDialog: MatDialog);
    handleXhrError(xhr: XMLHttpRequest | any, cmp?: any): void;
    showSnack(message: string, type: MessageType): void;
    mask(message: string): import("@angular/material/dialog").MatDialogRef<ProcessMaskComponent, any>;
    snackSuccess(message: string): void;
    snackDanger(message: string): void;
    snackWarning(message: string): void;
    snackInfo(message: string): void;
    private getSnackClass;
    private logXhr;
    noInternet(): void;
    noServerResponse(): void;
    serverUnauthorized(): void;
    showDefaultMessage(status: HttpStatusCode | 0): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotificationsService>;
}
