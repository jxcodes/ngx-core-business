import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogDataOptions, DialogOption } from '../dialog/dialog.component';
import { ComponentType } from '@angular/cdk/portal';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private matDialog: MatDialog) { }
  /**
   * Botones ACEPTAR/CANCELAR
   */
  confirm(
    title: string,
    message: string,
    suggested: 'confirm' | 'cancel' | 'none' = 'confirm',
    actionText = 'CONFIRMAR',
    options?: any
  ): Observable<any> {
    return this.openDialog(
      DialogComponent,
      {
        title,
        message,
        buttons: 'confirm_cancel',
        suggested,
        actionText,
      },
      options
    );
  }
  /**
   * Botones SÍ/NO
   */
  yesOrNot(
    title: string,
    message: string,
    suggested: 'yes' | 'no' = 'yes'
  ): Observable<any> {
    return this.openDialog(DialogComponent, {
      title,
      message,
      buttons: 'yes_not',
      suggested,
    });
  }
  /**
   * Botones ELIMINAR/CANCELAR
   */
  confirmDelete(title: string, message: string, actionText = 'ELIMINAR') {
    return this.openDialog(DialogComponent, {
      title,
      message,
      buttons: 'confirm_cancel',
      actionText,
      actionButtonColor: 'warn',
      suggested: 'cancel',
      maxWidth: 360,
    });
  }
  /**
   * Botones ACEPTAR
   */
  alert(title: string, message: string, options?: any) {
    return this.openDialog(DialogComponent, {
      title,
      message,
      buttons: 'ok',
      actionText: 'ACEPTAR',
      actionButtonColor: 'primary',
      maxWidth: 360,
      ...options,
    });
  }
  decide(title: string, message: string, options: DialogOption[]) {
    return this.openDialog(DialogComponent, {
      title,
      message,
      options,
    });
  }
  open<T>(component: ComponentType<T>, data: any, options?: any) {
    return this.matDialog
      .open(component, {
        data,
        disableClose: true,
        position: { top: '50px' },
        width: '100%',
        ...options,
      })
      .afterClosed();
  }
  /**
   * Abrir editor
   *
   * @param editorCmp Dialog component
   * @param model      Model
   * @param parent      Parent Model
   * @param data        Aditional data
   */
  openEditor<T>(editorCmp: ComponentType<T>, model: any, parent?: any, data?: any) {
    return this.matDialog
      .open(editorCmp, {
        data: {
          model,
          parent,
          data,
        },
        disableClose: true,
        position: { top: '50px' },
      })
      .afterClosed();
  }
  private openDialog<T>(editor: ComponentType<T>, data: DialogDataOptions, options?: any) {
    return this.matDialog
      .open(editor, {
        data,
        disableClose: true,
        position: { top: '50px' },
        ...options,
      })
      .afterClosed();
  }
}
