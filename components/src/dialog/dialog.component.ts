import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
export enum ButtonType {
  RAISED = 'raised',
  STROKED = 'stroked',
  NORMAL = 'normal',
}
type buttonsType = 'yes_not' | 'confirm_cancel' | 'cancel_confirm' | 'ok';
export interface DialogOption {
  text: string;
  buttonType?: ButtonType;
  buttonColor?: string;
  option?: boolean | number | string;
  closeButton?: boolean;
  suggested?: boolean;
}
export interface DialogDataOptions {
  title?: string;
  message: string;
  actionText?: string;
  actionButtonColor?: string;
  actionButtonType?: ButtonType;
  cancelButtonColor?: string;
  cancelButtonType?: ButtonType;
  cancelText?: string;
  buttonColor?: string;
  maxWidth?: number;
  options?: DialogOption[];
  suggested?: 'confirm' | 'cancel' | 'yes' | 'no' | 'none';
  buttons?: buttonsType;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  title: string = 'Confirmar';
  message = '';
  safeMessage: SafeHtml = '';
  actionText = 'ACEPTAR';
  yesText = 'SÍ';
  noText = 'NO';
  actionButtonColor = 'primary';
  actionButtonType: ButtonType = ButtonType.RAISED;
  cancelText = 'CANCELAR';
  cancelButtonColor!: string;
  cancelButtonType!: ButtonType;
  maxWidth!: number;
  options: DialogOption[] = [];
  suggested: 'confirm' | 'cancel' | 'yes' | 'no' | 'none' = 'none';
  buttons!: buttonsType;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private inputData: DialogDataOptions,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.setPropsFromData();
  }

  setPropsFromData() {
    const me = this;
    Object.assign(me, me.inputData);
    me.safeMessage = me.sanitizer.bypassSecurityTrustHtml(me.message);
    if (!me.options.length) {
      me.setDefaultButtons();
    }
  }

  setDefaultButtons() {
    const me = this;
    // Buttons YES/NOT
    if (me.buttons == 'yes_not') {
      me.options = me.getYesNotButtons();
      return;
    }
    if (me.buttons == 'confirm_cancel' || me.buttons == 'cancel_confirm') {
      me.options = [
        {
          text: me.actionText,
          buttonColor: me.actionButtonColor ? me.actionButtonColor : 'primary',
          buttonType: ButtonType.RAISED,
          option: true,
          suggested: me.suggested == 'confirm',
        },
        {
          text: me.cancelText,
          buttonType: ButtonType.NORMAL,
          option: false,
          suggested: me.suggested == 'cancel',
        },
      ];
      if (me.buttons == 'cancel_confirm') {
        me.options.reverse();
      }
      return;
    }
    if (me.buttons == 'ok') {
      me.options = [
        {
          text: me.actionText,
          buttonColor: me.actionButtonColor ? me.actionButtonColor : 'primary',
          buttonType: ButtonType.RAISED,
          option: true,
        },
      ];
    }
  }

  getYesNotButtons() {
    const me = this;
    return [
      {
        text: me.yesText,
        buttonColor: 'primary',
        buttonType:
          me.suggested == 'yes' ? ButtonType.RAISED : ButtonType.STROKED,
        option: true,
      },
      {
        text: me.noText,
        buttonColor: me.suggested == 'no' ? 'primary' : 'warn',
        buttonType:
          me.suggested == 'no' ? ButtonType.RAISED : ButtonType.STROKED,
        option: false,
      },
    ];
  }

  onOptionClick(option: DialogOption) {
    const me = this;
    me.dialogRef.close(option.option);
  }

}
