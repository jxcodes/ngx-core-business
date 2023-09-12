/**
 * Component Base Class
 *
 * Clase base para componentes que muestran datos en formato de listas o tablas
 * cargando datos desde el servidor.
 *
 * @author Jaime Cruz.
 */
import {
  OnInit,
  Injector,
  ViewChild,
  AfterViewInit,
  Directive,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { NotificationsService } from './services/notifications.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogService } from './services/dialog.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpCollectionService, CollectionQueryParams, QueryFilter, CollectionResponse } from 'ngx-core-business/http';
import { DataErrorViewComponent } from './data-error-view/data-error-view.component';

import { of, Subscription, Subject } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { StringUtils } from './utils/string-utils';


enum COMPONENT_TYPE {
  PAGE = 'page',
  COMPONENT = 'component',
}
@Directive()
export class TableViewComponent<T> implements OnInit, AfterViewInit {
  @Output() selectionChange = new EventEmitter<any[]>();
  /**
   * Tipo de componente
   *  - page: Si el componente que extiende está asociado con una ruta.
   *  - component: Si el componente extendido esta dentro de otro componente
   *
   */
  protected type: string = 'page';
  // @config llama a loadData inmediatamente
  autoload = true;
  apiUrl: string = '';
  sendModelOnDelete = false;
  requestParams: { [key: string]: string | number | boolean } = {};
  dataPath: string = '';
  displayedColumns: string[] = [];
  itemSingularName: string = 'ítem';
  itemPluralName: string = 'ítems';
  itemSingularArticle: string = 'el';
  // Si se asigna un valor a la propiedad en una subclase, ya no se usará confirmDeleteTitleTpl
  confirmDeleteTitle: string = '';
  confirmDeleteTitleTpl = 'Eliminar {itemName}';
  deleteItemQuestionText = '';
  deleteItemQuestionTextTpl = '¿Seguro que desea eliminar {itemArticle} {itemName}?';
  deleteItemConfirmDialogContentTpl = '{question}<div class="mt-2"><strong style="text-transform: capitalize;">{itemName}</strong></div>';
  deleteItemConfirmButtonText = 'ELIMINAR';
  successfullyDeletedItemNotificationTpl = '{itemName} eliminado correctamente';
  protected editorClass: any;
  protected editionDisabled = false;

  // Propiedades disponibles
  pageSize = 25;
  pageIndex = 0;
  // Guarda una copia del array de datos recibidos del servicio,
  // Nota: solo se clonan los objetos de primer nivel usando
  // map(e => { return { ...e } });
  _rawData!: T[];
  // Guarda una copia de la data que ha pasado por el metodo transformServiceResponseData
  _rawTransformedData!: T[];
  // Contiene la data que es visualizada en la interfaz
  data!: T[];
  selectedRow: any;
  totalRecords = 0;
  selectedRowIndex: number = -1;
  selection: SelectionModel<any>;
  selectionMultiple: boolean = false;
  modelIdProperty = 'id';
  modelNameProperty = 'name';
  // Services
  protected notifications: NotificationsService;
  protected http: HttpClient;
  protected matDialog: MatDialog;
  protected dialogService: DialogService;
  protected httpGetList: HttpCollectionService;
  protected router: Router;
  protected route: ActivatedRoute;

  // Child components
  @ViewChild(MatTable) table?: MatTable<any>;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(DataErrorViewComponent) errorView?: DataErrorViewComponent;
  filters: QueryFilter[] = [];
  $fields: string = '';
  localSearchFilter!: QueryFilter;
  searchFilter!: QueryFilter;
  // Propiedades de estado
  _isLoadingData = false;
  _didLoadDataFailed = false;
  _loadSubcription?: Subscription;

  //
  clearDataOnFail = true;
  private loadObs = new Subject();
  public load = this.loadObs.asObservable();
  private errorStatus: number = 0;
  constructor(protected injector: Injector) {
    this.notifications = injector.get(NotificationsService);
    this.http = injector.get(HttpClient);
    this.httpGetList = injector.get(HttpCollectionService);
    this.matDialog = injector.get(MatDialog);
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.dialogService = injector.get(DialogService);
    // Selection model
    this.selection = new SelectionModel<any>(this.selectionMultiple, []);
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
      return;
    }
    // Open editor
    if (e.code === 'Enter' && me.getSelection().length == 1 && me.editorClass) {
      me.editItemHandler(me.selection.selected[0]);
      return;
    }
    // Select Next
    if (e.code === 'ArrowDown' && me.getSelection().length == 1) {
      me.selectNext();
      return;
    }
    // Select Previus
    if (e.code === 'ArrowUp' && me.getSelection().length == 1) {
      me.selectPrevious();
    }
  }

  loadData() {
    this.loadObs.next(null);
  }

  _subscribeLoadEvent() {
    const me = this;
    me._loadSubcription = me.load
      .pipe(
        switchMap(() => {
          me.beforeLoad();
          me._isLoadingData = true;
          me._didLoadDataFailed = false;
          return me.httpGetList
            .get<CollectionResponse<T>>(me.getRequestUrl(), me.getBaseRequestParams())
            .pipe(
              catchError((xhr) => {
                me._isLoadingData = false;
                me._didLoadDataFailed = true;
                me.handleServerError(xhr);
                return of(null);
              })
            );
        })
      )
      .subscribe(me.onDataServiceResponse.bind(me));
  }
  onDataServiceResponse(res: any) {
    const me = this;
    // When error has happened and was catched by catchError
    if (me._didLoadDataFailed) return;

    let data: T[] = [],
      total = 0;
    // res: {data: any[], total: number }
    if (
      Object.prototype.toString.call(res) == '[object Object]' &&
      Array.isArray(res.data)
    ) {
      data = res.data;
      if (isNaN(res.total)) {
        total = data.length;
      } else {
        total = +res.total > data.length ? +res.total : data.length;
      }
    }
    // res: any[]
    else if (Array.isArray(res)) {
      data = res;
      total = res.length;
    }
    me._rawData = data.map(e => { return { ...e } });
    me._rawTransformedData = me.transformServiceResponseData(data);
    me.data = me._rawTransformedData.map(e => { return { ...e } });

    me.totalRecords = total;
    me._isLoadingData = false;
  }
  transformServiceResponseData(data: any[]) {
    return data;
  }

  /**
   * Hook
   * Es llamado antes de solicitar datos al servidor
   */
  beforeLoad() { }

  getSelection() {
    const me = this;
    let selection = me.selection.selected;
    if (selection.length) {
      // Single selection
      if (!me.selectionMultiple) {
        if (me.recordExists(selection[0])) {
          return selection;
        }
        me.selection.clear();
        return [];
      } else {
        selection = selection.filter((item) => me.recordExists(item));
        me.selection.clear();
        selection.forEach((item) => me.selection.select(item));
      }
    }
    return me.selection.selected;
  }

  recordExists(rec: any) {
    let out = false;
    let data = this.data || [];
    data.forEach((item: any) => {
      if (item == rec) {
        out = true;
      }
    });
    return out;
  }

  getRecordByIndex(idx: number) {
    let data = this.data || [];
    return data[idx] ? data[idx] : null;
  }

  getRecordIndex(rec: any) {
    let out = -1;
    let data = this.data || [];
    data.forEach((item: any, idx: number) => {
      if (item === rec) {
        out = idx;
      }
    });
    return out;
  }

  selectNext() {
    const me = this;
    // Matener condicionales separadas
    if (!me.selection.hasValue()) {
      return;
    }
    if (me.selectionMultiple) {
      return;
    }
    let index = me.getRecordIndex(me.selection.selected[0]);
    if (me.validIndex(index)) {
      let nextRec = me.getRecordByIndex(index + 1);
      if (nextRec) {
        me.selection.select(nextRec);
      }
    }
  }

  selectPrevious() {
    const me = this;
    // Matener condicionales separadas
    if (!me.selection.hasValue()) {
      return;
    }
    if (me.selectionMultiple) {
      return;
    }
    let index = me.getRecordIndex(me.selection.selected[0]);
    if (me.validIndex(index)) {
      let nextRec = me.getRecordByIndex(index - 1);
      if (nextRec) {
        me.selection.select(nextRec);
      }
    }
  }

  validIndex(index: number) {
    return index != -1;
  }

  getBaseRequestParams(): CollectionQueryParams {
    const me = this,
      paginator = me.paginator,
      sorter = me.sort,
      filters = me.getFilters(),
      fields = me.$fields;
    let out: CollectionQueryParams = {};
    // Paginación
    if (paginator) {
      out.page = paginator.pageIndex + 1;
      out.limit = paginator.pageSize;
    } else {
      out.page = me.pageIndex + 1;
      out.limit = me.pageSize;
    }
    // Query
    if (me.searchFilter?.value) {
      out.query = me.searchFilter?.value;
    }
    // Filters
    if (filters && filters.length) {
      out.filters = filters;
    }
    // Sorters
    // Por ahora solo está soportando un simple sort
    if (sorter && sorter.active && sorter.direction) {
      out.sorters = [{ field: sorter.active, direction: sorter.direction }];
    }
    if (fields) {
      out.fields = fields;
    }
    return out;
  }


  getApiUrl() {
    return this.apiUrl;
  }

  getDataPath() {
    return this.dataPath;
  }

  getCollectionUrl() {
    return this.getApiUrl() + '/' + this.getDataPath();
  }
  getDeleteResourceUrl(model: T) {
    const me = this;
    let modelId = (model as any)[me.modelIdProperty];
    return me.getCollectionUrl() + '/' + modelId
  }
  getRequestUrl(): string {
    const me = this,
      queryParams = me.getRequestParams(),
      url = me.router
        .createUrlTree([me.getDataPath()], { queryParams })
        .toString();
    return me.getApiUrl() + url;
  }

  getRequestParams(): { [key: string]: number | string | boolean } {
    return this.requestParams;
  }

  /**
   * ACTION HANDLERS
   */
  addItemHandler() {
    const me = this;
    const dialogRef = me.matDialog.open(me.editorClass, {
      data: me.getEditorData(),
      position: { top: '50px' },
      disableClose: true,
    });
    // Cuando el formulario se cierra.
    dialogRef.afterClosed().subscribe((data) => {
      me.afterCreateEditorClosed(data);
    });
  }

  editItemHandler(rec: any) {
    const me = this;
    if (me.editionDisabled) {
      return;
    }
    const dialogRef = me.matDialog.open(me.editorClass, {
      data: me.getEditorData(rec),
      disableClose: true,
      position: { top: '50px' },
    });
    dialogRef.afterClosed().subscribe((data) => {
      me.afterUpdateEditorClosed(data);
    });
  }

  deleteItemHandler(model: any) {
    const me = this;
    me.dialogService
      .confirmDelete(
        me.getDeleteItemConfirmDialogTitle(model),
        me.getDeleteItemConfirmDialogContent(model),
        me.deleteItemConfirmButtonText,
      )
      .subscribe((ok) => {
        if (ok) {
          me.deleteResource(model);
        }
      });
  }

  deleteResource(model: T) {
    const me = this;
    me.http.delete(me.getDeleteResourceUrl(model), me.sendModelOnDelete ? { body: model } : undefined).subscribe(() => {
      me.notifications.snackSuccess(me.getSuccessfullyDeletedItemNotificationContent(model));
      me.removeRecord(model);
    });
  }

  getEditorData(rec?: T): { [key: string]: any, model?: T } {
    return {
      model: rec,
    };
  }

  updateRecord(rec: T) {
    const me = this;
    me.data = me.data?.map((item: any) =>
      item[me.modelIdProperty] != (rec as any)[me.modelIdProperty] ? item : rec
    );
    me.updateView();
  }

  removeRecord(model: T) {
    const me = this;
    me.data = me.data?.filter((rec: T) => {
      return rec != model;
    });
    me.totalRecords--;
    me.updateView();
  }


  /**
   * Este metodo puede ser sobre escrito para evitar el comportamiento por defecto.
   */
  afterCreateEditorClosed(model: T) {
    const me = this;
    if (model) {
      //funcion creada para agregar datos a la matriz
      me.data?.push(model);
      me.updateView();
    }
  }

  /**
   * Este metodo puede ser sobre escrito para evitar el comportamiento por defecto.
   */
  afterUpdateEditorClosed(model: any) {
    const me = this;
    if (model) {
      // Update record
      me.updateRecord(model);
    }
  }

  /**
   * Nota: Sobrescribir este metodo para titulos personalizados.
   */
  getDeleteItemConfirmDialogTitle(model: any): string {
    const me = this;
    if (me.confirmDeleteTitle) return me.confirmDeleteTitle;
    return StringUtils.compileTpl(
      me.confirmDeleteTitleTpl,
      // Capitalize string
      { itemName: me.itemSingularName.charAt(0).toUpperCase() + me.itemSingularName.slice(1) }
    );
  }

  /**
   * Nota: Sobrescribir este metodo para mensajes personalizados
   */
  getDeleteItemConfirmDialogContent(model: T): string {
    return StringUtils.compileTpl(
      this.deleteItemConfirmDialogContentTpl,
      this.getDeleteItemConfirmDialogTplData(model)
    );
  }

  getDeleteItemConfirmDialogTplData(model: T): any {
    const me = this;
    let question = me.deleteItemQuestionText;
    if (!question) {
      question = StringUtils.compileTpl(
        me.deleteItemQuestionTextTpl,
        {
          itemName: me.itemSingularName,
          itemArticle: me.itemSingularArticle
        }
      );
    }
    return {
      question,
      itemName: this.getItemIdentificationName(model),
    };
  }

  /**
   * Nota: Sobrescribir este metodo para mensajes personalizados
   */
  getSuccessfullyDeletedItemNotificationContent(model: T): string {
    return StringUtils.compileTpl(
      this.successfullyDeletedItemNotificationTpl,
      this.getSuccessfullyDeletedItemNotificationTplData(model)
    );
  }

  getSuccessfullyDeletedItemNotificationTplData(model: T): any {
    return {
      itemName: this.getItemIdentificationName(model),
    };
  }

  getItemIdentificationName(model: T): string {
    return (model as any)[this.modelNameProperty] || '';
  }

  reloadHandler() {
    this.loadData();
  }

  ngOnInit(): void {
    const me = this;
    me._subscribeLoadEvent();
    me.subscribeRouteParams();
    me.loadDatasets();
    me._createSelectionModel();
    if (me.autoload) {
      me.loadData();
    }
  }
  subscribeRouteParams() { }
  loadDatasets() { }
  _createSelectionModel() {
    const me = this;
    me.selection = new SelectionModel<T>(me.selectionMultiple, []);
    me.selection.changed.subscribe((selection) => {
      me.selectionChange.emit(selection.source.selected);
    });
  }

  ngAfterViewInit() {
    const me = this;
    if (me.sort) {
      me.sort.sortChange.subscribe(() => {
        if (me.paginator) {
          me.paginator.pageIndex = 0;
        }
        me.loadData();
      });
    }
    if (me.paginator) {
      me.paginator.page.subscribe(() => {
        me.loadData();
      });
    }
  }

  /**
   * Solo notificará los errores de servidor componentes tipo component
   */
  handleServerError(xhr: any) {
    const me = this;
    this.errorStatus = xhr.status;
    if (me.type == COMPONENT_TYPE.COMPONENT) {
      me.notifications.handleXhrError(xhr);
    }
  }

  //*** actualizar las celdas */
  updateView() {
    if (this.table) {
      this.table.renderRows();
    }
  }

  applyFilters(filters: QueryFilter[]) {
    const me = this;
    me.filters = filters;
    me.resetPageIndex();
    me.loadData();
  }

  resetPageIndex() {
    const me = this;
    if (me.paginator) me.paginator.pageIndex = 0;
  }

  getFilters(): QueryFilter[] {
    return this.filters;
  }

  applySearchFilter(filter: QueryFilter) {
    const me = this;
    me.searchFilter = filter;
    if (me.paginator) me.paginator.pageIndex = 0;
    me.loadData();
  }

  applyLocalSearchFilter(filter: QueryFilter) {
    const me = this;
    me.localSearchFilter = filter;
    me.filterData(filter.value);
  }
  /**
   * Determina si se debería o no mostrar el mensaje de cargando
   */
  shouldShowProgressView() {
    const me = this;
    return me._isLoadingData && !me.data;
  }

  shouldShowErrorView() {
    const me = this;
    return me._didLoadDataFailed && !me._isLoadingData;
  }

  // FIX
  shouldShowTitleBar() {
    const me = this;
    return !me._didLoadDataFailed && !me._isLoadingData;
  }

  shouldShowContent() {
    const me = this;
    return !me._didLoadDataFailed && !me._isLoadingData;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.getSelection().length;
    const numRows = this.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data?.forEach((row: any) => this.selection.select(row));
  }

  ngOnDestroy(): void {
    if (this._loadSubcription) {
      this._loadSubcription.unsubscribe();
    }
  }

  // Updates a specific field and makes the http request if it's necessary
  updateValue(model: any, fieldName: string, newValue: string | number | boolean) {
    const me = this;
    // No requiere actualizar
    if (model[fieldName] == newValue) {
      return;
    }
    const oldValue = model[fieldName];
    model[fieldName] = newValue;
    me.http
      .put(me.getCollectionUrl() + '/' + model[me.modelIdProperty], model)
      .subscribe(
        (_) => {
          me.afterValueUpdated(model, fieldName, newValue, oldValue);
        },
        (xhr) => {
          // Reset on error
          model[fieldName] = oldValue;
          me.notifications.handleXhrError(xhr);
        }
      );
  }

  afterValueUpdated(model: T, fieldName: string, newValue: any, oldValue: any) {

  }

  navigateToItemView(id: number) {
    this.router.navigate(['./', id], { relativeTo: this.route });
  }

  getBaseHref(): string {
    return document.baseURI;
  }

  getPageIndex() {
    return this.paginator ? this.paginator.pageIndex : this.pageIndex;
  }

  getPageSize() {
    return this.paginator ? this.paginator.pageSize : this.pageSize;
  }

  getItemNumber(index: number): number {
    return this.getPageIndex() * this.getPageSize() + index + 1;
  }

  /**
   * Filtra por todas las columnas
   * @param text Texto buscado
   */
  filterData(text: string) {
    const me = this;
    text = (text || '').toString().trimStart().toLowerCase();
    me.data = me._rawTransformedData.filter((item: any) => {
      return Object.keys(item).some(key => {
        const value = (item[key] || '').toString().toLowerCase();
        return value.includes(text.toLowerCase());
      })
    });
  }

  getErrorStatus(): number {
    return this.errorStatus;
  }

}
