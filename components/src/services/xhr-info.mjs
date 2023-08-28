import { HttpStatusMessages } from './http-statuses.message';
export class XhrInfo {
    /**
     * true is status = 400
     */
    static isBadRequest(xhr) {
        return xhr.status == 400 /* HttpStatusCode.BadRequest */;
    }
    /**
     * true is status = 401
     */
    static isUnauthorized(xhr) {
        return xhr.status == 401 /* HttpStatusCode.Unauthorized */;
    }
    /**
     * true is status = 403
     */
    static isForbidden(xhr) {
        return xhr.status == 403 /* HttpStatusCode.Forbidden */;
    }
    static getStatusMessage(status) {
        return HttpStatusMessages[status] || `Error status: ${status}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLWluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ4aHItaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU3RCxNQUFNLE9BQU8sT0FBTztJQUNsQjs7T0FFRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBbUI7UUFDckMsT0FBTyxHQUFHLENBQUMsTUFBTSx1Q0FBNkIsQ0FBQztJQUNqRCxDQUFDO0lBQ0Q7O09BRUc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQW1CO1FBQ3ZDLE9BQU8sR0FBRyxDQUFDLE1BQU0seUNBQStCLENBQUM7SUFDbkQsQ0FBQztJQUNEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFtQjtRQUNwQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLHNDQUE0QixDQUFDO0lBQ2hELENBQUM7SUFDRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBMEI7UUFDaEQsT0FBTyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxpQkFBaUIsTUFBTSxFQUFFLENBQUM7SUFDakUsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFN0YXR1c0NvZGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEh0dHBTdGF0dXNNZXNzYWdlcyB9IGZyb20gJy4vaHR0cC1zdGF0dXNlcy5tZXNzYWdlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBYaHJJbmZvIHtcclxuICAvKipcclxuICAgKiB0cnVlIGlzIHN0YXR1cyA9IDQwMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBpc0JhZFJlcXVlc3QoeGhyOiBYTUxIdHRwUmVxdWVzdCkge1xyXG4gICAgcmV0dXJuIHhoci5zdGF0dXMgPT0gSHR0cFN0YXR1c0NvZGUuQmFkUmVxdWVzdDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogdHJ1ZSBpcyBzdGF0dXMgPSA0MDFcclxuICAgKi9cclxuICBzdGF0aWMgaXNVbmF1dGhvcml6ZWQoeGhyOiBYTUxIdHRwUmVxdWVzdCkge1xyXG4gICAgcmV0dXJuIHhoci5zdGF0dXMgPT0gSHR0cFN0YXR1c0NvZGUuVW5hdXRob3JpemVkO1xyXG4gIH1cclxuICAvKipcclxuICAgKiB0cnVlIGlzIHN0YXR1cyA9IDQwM1xyXG4gICAqL1xyXG4gIHN0YXRpYyBpc0ZvcmJpZGRlbih4aHI6IFhNTEh0dHBSZXF1ZXN0KSB7XHJcbiAgICByZXR1cm4geGhyLnN0YXR1cyA9PSBIdHRwU3RhdHVzQ29kZS5Gb3JiaWRkZW47XHJcbiAgfVxyXG4gIHN0YXRpYyBnZXRTdGF0dXNNZXNzYWdlKHN0YXR1czogSHR0cFN0YXR1c0NvZGUgfCAwKSB7XHJcbiAgICByZXR1cm4gSHR0cFN0YXR1c01lc3NhZ2VzW3N0YXR1c10gfHwgYEVycm9yIHN0YXR1czogJHtzdGF0dXN9YDtcclxuICB9XHJcbn1cclxuIl19