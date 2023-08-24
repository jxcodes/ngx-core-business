import { Component, Output, EventEmitter, Input } from '@angular/core';

const HTTP_STATUS_MESSAGES: { [key: number]: string } = {
  0: 'No se logró establecer conexión con el servidor',
  400: 'El servidor no pudo procesar la petición',
  401: 'Inicio de sesión requerido.',
  403: 'Ud. No cuenta con los permisos necesarios para realizar acceder a está funcionalidad.',
  404: 'Es servicio solicitado no existe.',
  500: 'Ha ocurrido un error en nuestro servidor, por favor intente más tarde.',
  502: 'No se recibio respuesta de servicio externo.',
  503: 'Este servicio se encuentra temporalmente deshabilitado.'
}
@Component({
  selector: 'ngbiz-data-error-view',
  templateUrl: './data-error-view.component.html',
  styleUrls: ['./data-error-view.component.scss'],
  host: { class: 'container-center info-view danger' },
})
export class DataErrorViewComponent {
  defaultErrorMessage: string = 'Ha ocurrido un error en nuestro servidor, por favor intente más tarde.';
  message!: string;
  @Input() errorIcon: string = 'app:ha-cloud-error';
  @Input() buttonIcon: string = 'app:refresh';
  @Input() buttonText: string = 'Intentar nuevamente';
  @Input() status!: number;
  @Input() showActionButton: boolean = true;
  @Output() actionClick = new EventEmitter();
  ngOnInit(): void {
    const me = this;
    me.message = HTTP_STATUS_MESSAGES[me.status] || me.defaultErrorMessage;
    // Autenticacion requerida
    if (me.status === 401) {
      me.showActionButton = false;
      return;
    }
    // Acceso prohibido
    if (me.status === 403) {
      me.showActionButton = false;
    }
  }
}
