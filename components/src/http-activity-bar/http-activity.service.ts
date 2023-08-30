import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpActivityService {
  observer = new Subject<boolean>();
  public statusChange = this.observer.asObservable();
  showIndicator() {
    this.observer.next(true);
  }
  hideIndicator() {
    this.observer.next(false);
  }
}
