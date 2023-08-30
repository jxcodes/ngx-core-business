import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionQueryParams } from './collection-query-params';
import { QueryFilter } from './query-filter';
import { QuerySorter } from './query-sorter';

@Injectable({
  providedIn: 'root',
})
export class HttpCollectionService {
  private pageParam   = 'page';
  private limitParam  = 'limit';
  private queryParam  = 'query';
  private sortParam   = 'sort';
  private filterParam = 'filter';
  private fieldsParam = '$fields';
  constructor(private http: HttpClient) { }
  /**
   * Realiza una petición GET
   */
  get<T>(
    url: string,
    options: CollectionQueryParams = {
      page: 1,
      limit: 25,
    }
  ): Observable<T> {
    const me = this;
    const queryParams = [];
    if (options.page) {
      queryParams.push(`${me.pageParam}=${options.page}`);
    }
    if (options.limit) {
      queryParams.push(`${me.limitParam}=${options.limit}`);
    }
    if (options.query) {
      queryParams.push(`${me.queryParam}=${options.query}`);
    }
    if (options.sorters) {
      queryParams.push(
        `${me.sortParam}=${me.encodeSorters(options.sorters)}`
      );
    }
    if (options.filters) {
      queryParams.push(
        `${me.filterParam}=${me.encodeFilters(options.filters)}`
      );
    }
    if (options.fields) {
      queryParams.push(`${me.fieldsParam}=${options.fields}`);
    }
    url = me.urlAppend(url, queryParams.join('&'));
    return me.http.get<T>(url);
  }

  private urlAppend(url: string, str: string) {
    if (str) {
      return url + (url.indexOf('?') == -1 ? '?' : '&') + str;
    }
    return url;
  }

  private encodeSorters(sorters: QuerySorter[]) {
    return encodeURI(JSON.stringify(sorters));
  }

  private encodeFilters(filters: QueryFilter[]) {
    return encodeURI(
      JSON.stringify(
        filters.map((filter) => {
          return {
            type: filter.type,
            field: filter.field,
            operator: filter.operator,
            value: filter.value,
          };
        })
      )
    );
  }

}
