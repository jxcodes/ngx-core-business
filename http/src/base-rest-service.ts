import { Injector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpCollectionService } from './http-collection.service';
import { CollectionResponse } from './collection-response';
import { CollectionQueryParams } from './collection-query-params';

@Injectable()
export abstract class BaseRestService {

  protected apiUrl: string | undefined;
  /**
   * Collection Path
   *
   * Ruta relativa de la lista de recursos.
   *
   * Ejemplo: api/users
   *
   */
  protected collectionPath!: string;
  protected collectionUrl: string = '';
  /**
   * Usa estrictamene la url señalada.
   */
  strictApiUrl: string = '';

  protected http: HttpClient;
  protected httpList: HttpCollectionService;
  protected router: Router;
  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
    this.router = injector.get(Router);
    this.httpList = injector.get(HttpCollectionService);
  }

  abstract getApiUrl(): string;

  protected getCollectionUrl() {
    const me = this;
    return (
      me.collectionUrl ||
      (me.collectionUrl = `${me.getApiUrl()}/${me.collectionPath}`)
    );
  }

  /**
   * GET List
   */
  list<T>(options?: CollectionQueryParams): Observable<CollectionResponse<T[]>> {
    return this.httpList.get(this.getCollectionUrl(), options);
  }

  /**
   * GET
   * @param id The resource ID
   */
  get(id: number | string): Observable<any> {
    const me = this;

    return me.http
      .get<any>(`${me.getCollectionUrl()}/${id}`)
      .pipe(map((res) => res.data));
  }

  /**
   * POST
   */
  create<T>(model: T): Observable<T> {
    const me = this;
    return me.http
      .post<CollectionResponse<T>>(`${me.getCollectionUrl()}`, model)
      .pipe(map((res) => res.data));
  }

  /**
   * PUT
   */
  update<T>(model: any, id?: string | number): Observable<T> {
    const me = this;
    return me.http
      .put<CollectionResponse<T>>(`${me.getCollectionUrl()}/${id || model.id}`, model)
      .pipe(map((res) => res.data));
  }

  save<T>(model: any, id?: string | number) {
    return id || model.id ? this.update<T>(model, id) : this.create<T>(model);
  }

  /**
   * DELETE
   */
  delete(id: number | string) {
    const me = this;
    return me.http.delete(`${me.getCollectionUrl()}/${id}`);
  }

  buildUrl(segments: any[], baseUrl: string = this.getCollectionUrl()) {
    return baseUrl + this.router.createUrlTree(segments).toString();
  }

  getBlob(url: string) {
    const me = this;
    return me.http
      .get(url, {
        observe: 'response',
        responseType: 'blob',
      })
      .pipe(map((res) => res.body));
  }

  getFile(url: string) {
    const me = this;
    return me.http
      .get(url, {
        observe: 'response',
        responseType: 'blob',
      })
      .pipe(map((res) => {
        res.body
        if (res.body) {
          // Get the file name from the response.
          const fileName = res.headers.get('Content-Disposition')?.split('filename=')[1];
          if (!fileName) {
            console.error('El servidor no ha devuelto el nombre del archivo. en la cabecera Content-Disposition, Access-Control-Expose-Headers tambien debe ser añadido.');
            return;
          }
          return {
            file: res.body,
            fileName,
          }
        }
        return res.body;
      }));
  }

  getCollectionPath() {
    return this.collectionPath;
  }

}
