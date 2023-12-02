import { OnInit, Injector, Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { NotificationsService } from './services/notifications.service';
import { MessageType } from './services/message.type';

@Directive()
export abstract class ModelViewComponent<T> implements OnInit {
  // @config llama a loadData inmediatamente
  autoload = true;
  _loadDataCount = 0;
  _isLoadingData = false;
  _didLoadDataFailed = false;
  _didValidationFailed = false;
  model!: T;
  modelId: any;
  // Message
  messageText!: string;
  messageType: MessageType = 'info';
  messageActionText: string = 'Intentar nuevamente';
  messageActionIcon: string = 'app:refresh';

  private modelObs = new BehaviorSubject<any>(null);
  model$: Observable<any> = this.modelObs.asObservable();
  protected notifications: NotificationsService;
  protected router: Router;
  protected route: ActivatedRoute;
  protected location: Location;
  private loadObs = new Subject();
  public load = this.loadObs.asObservable();
  private errorStatus: number = 0;
  _loadSubcription!: Subscription;
  constructor(protected injector: Injector) {
    this.notifications = injector.get(NotificationsService);
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.location = injector.get(Location);
  }
  // Keyboard listeners
  @HostListener('window:keyup', ['$event'])
  keyEvent(e: KeyboardEvent) {
    const me = this;
    if ((e.target as Element).tagName != 'BODY') {
      return;
    }
    // Reload data
    if (e.code === 'KeyA') {
      me.loadData();
    }
  }
  ngOnInit(): void {
    const me = this;
    me._subscribeLoadEvent();
    me.subscribeRouteParams();
    if (me.autoload) {
      me.loadData();
    }
  }
  ngOnDestroy(): void {
    if (this._loadSubcription) {
      this._loadSubcription.unsubscribe();
    }
  }
  loadData() {
    if (this.validParams()) {
      this.loadObs.next(null);
    }
  }
  validParams() {
    return true;
  }
  subscribeRouteParams() { }
  _subscribeLoadEvent() {
    const me = this;
    me._loadSubcription = me.load
      .pipe(
        switchMap(() => {
          me._loadDataCount++;
          me._isLoadingData = true;
          return me.getDataService().pipe(
            catchError((xhr) => {
              me._isLoadingData = false;
              me._didLoadDataFailed = true;
              me.onError(xhr);
              return of(null);
            })
          );
        })
      )
      .subscribe(me.setModel.bind(me));
  }
  protected onData(data: any) { }
  protected onError(xhr: any) {
    this.errorStatus = xhr.status;
  }
  setModel(model: T) {
    this.model = model;
    this.onData(model);
    this.modelObs.next(model);
  }
  abstract getDataService(): Observable<any>;
  /**
   * Determina si se debería o no mostrar el mensaje de cargando
   */
  shouldShowProgressView() {
    const me = this;
    return me._isLoadingData && !me.model;
  }
  shouldShowErrorView() {
    const me = this;
    return (
      !me._isLoadingData && (me._didLoadDataFailed || me._didValidationFailed)
    );
  }
  shouldShowPageMessage() {
    const me = this;
    return (
      !me._isLoadingData && (me._didLoadDataFailed || me._didValidationFailed)
    );
  }
  print() {
    window.print();
  }
  getErrorStatus(): number {
    return this.errorStatus;
  }
  getCurrentUrl() {
    return location.href;
  }
  getBaseHref(): string {
    return document.baseURI;
  }
}
