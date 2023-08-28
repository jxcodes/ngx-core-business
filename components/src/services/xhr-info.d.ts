import { HttpStatusCode } from '@angular/common/http';
export declare class XhrInfo {
    /**
     * true is status = 400
     */
    static isBadRequest(xhr: XMLHttpRequest): boolean;
    /**
     * true is status = 401
     */
    static isUnauthorized(xhr: XMLHttpRequest): boolean;
    /**
     * true is status = 403
     */
    static isForbidden(xhr: XMLHttpRequest): boolean;
    static getStatusMessage(status: HttpStatusCode | 0): string;
}
