import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpStatusCode } from '@angular/common/http';
import { ProcessMaskComponent } from '../process-mask';
import { SnackBarComponent } from '../snack-bar';
import { MessageType } from './message.type';
import { XhrInfo } from './xhr-info';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  http_server_message_tpl = `
  <p style="max-width: 360px;">
    CITES - PERÚ<br>
    <i>{message}</i>
  </p>
  <small><small>ERROR {status}</small></small>`;
  constructor(private _snackBar: MatSnackBar, private matDialog: MatDialog) { }
  handleXhrError(xhr: XMLHttpRequest | any, cmp?: any) {
    const me = this,
      defaultMessageStatuses = [
        0, // No internet
        404, // Servicio no encontrado
        500, // Server error
      ],
      status = xhr.status;
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
      const messageType: MessageType = status == 400 ? 'warning' : 'danger';
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
  showSnack(message: string, type: MessageType) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      panelClass: this.getSnackClass(type),
      data: {
        html: message,
      },
      duration: 2000,
      verticalPosition: 'top', // 'top' | 'bottom'
    });
  }
  mask(message: string) {
    return this.matDialog.open(ProcessMaskComponent, {
      disableClose: true,
      data: {
        message,
      },
    });
  }
  snackSuccess(message: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      panelClass: this.getSnackClass('success'),
      data: {
        html: message,
      },
      duration: 2000,
      verticalPosition: 'top', // 'top' | 'bottom'
    });
  }
  snackDanger(message: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      panelClass: this.getSnackClass('danger'),
      data: {
        html: message,
      },
      duration: 2000,
      verticalPosition: 'top', // 'top' | 'bottom'
    });
  }
  snackWarning(message: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      panelClass: this.getSnackClass('warning'),
      data: {
        html: message,
      },
      duration: 2000,
      verticalPosition: 'top', // 'top' | 'bottom'
    });
  }
  snackInfo(message: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      panelClass: this.getSnackClass('info'),
      data: {
        html: message,
      },
      duration: 2000,
      verticalPosition: 'top', // 'top' | 'bottom'
    });
  }
  private getSnackClass(type: MessageType) {
    const map = {
      warning: ['bg-warning', 'text-dark'],
      danger: ['bg-danger', 'text-white'],
      info: ['bg-info', 'text-white'],
      success: ['bg-success', 'text-white'],
    };
    return map[type];
  }
  private logXhr(xhr: XMLHttpRequest) {
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
  showDefaultMessage(status: HttpStatusCode | 0) {
    this._snackBar.open(XhrInfo.getStatusMessage(status), 'ACEPTAR', {
      verticalPosition: 'top',
    });
  }
}
