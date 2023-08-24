import { HttpStatusCode } from '@angular/common/http';
import { HttpStatusMessages } from './http-statuses.message';

export class XhrInfo {
  /**
   * true is status = 400
   */
  static isBadRequest(xhr: XMLHttpRequest) {
    return xhr.status == HttpStatusCode.BadRequest;
  }
  /**
   * true is status = 401
   */
  static isUnauthorized(xhr: XMLHttpRequest) {
    return xhr.status == HttpStatusCode.Unauthorized;
  }
  /**
   * true is status = 403
   */
  static isForbidden(xhr: XMLHttpRequest) {
    return xhr.status == HttpStatusCode.Forbidden;
  }
  static getStatusMessage(status: HttpStatusCode | 0) {
    return HttpStatusMessages[status] || `Error status: ${status}`;
  }
}
