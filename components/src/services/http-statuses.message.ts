import { HttpStatusCode } from "@angular/common/http";

export const HttpStatusMessages: {
  [key in HttpStatusCode | 0]?: string;
} = {
  0: 'No se pudo conectar con el servidor',
  400: 'El servidor no pudo procesar la petición',
  401: 'Inicio de sesión requerido.',
  403: 'Acceso prohibido.',
  404: 'Es servicio solicitado no existe.',
  500: 'Ha ocurrido un error en nuestro servidor, por favor intente más tarde.',
  502: 'No se recibio respuesta de servicio externo.',
  503: 'Este servicio se encuentra temporalmente deshabilitado.'
};
