import { Output, EventEmitter, Directive } from '@angular/core';
import { CollectionFilter, ComparisonOperator, } from 'ngx-kit-business/types';

@Directive()
export class FiltersContainerComponent {
  filters: CollectionFilter[] = [];
  searchFilter!: CollectionFilter;

  @Output() filtersChange: EventEmitter<CollectionFilter[]> = new EventEmitter();
  @Output() searchFilterChange: EventEmitter<CollectionFilter> = new EventEmitter();

  setFilterValue(
    id: string,
    value: any,
    active?: boolean,
    operator?: ComparisonOperator
  ) {
    const me = this;
    let filter = me.getFilter(id);
    if (filter) {
      filter.value = value;
      filter.active = true;
      filter.operator = operator ? operator : filter.operator;
      // Posibilidades de desactivar el filtro
      if (
        filter.type == 'string' &&
        (!value || value == filter.inactiveOnValue)
      ) {
        filter.active = false;
      }
      if (filter.type == 'numeric' && value == filter.inactiveOnValue) {
        filter.active = false;
      }
      if (filter.type == 'list' && (!value || !value.length)) {
        filter.active = false;
      }
      if (filter.type == 'date' && (!value || !value.length)) {
        filter.active = false;
      }
      // El valor active predomina si es establecido esplicitamente
      if (active === true || active === false) {
        filter.active = active;
      }
    }
    me.fireEvent();
  }
  setSearchFilterValue(value: string) {
    this.searchFilter = { ...this.searchFilter, value };
    this.searchFilterChange.emit(this.searchFilter);
  }
  activeFilter(field: string, active: boolean) {
    const me = this;
    me.filters.forEach((item) => {
      if (item.field == field) {
        item.active = !!active;
      }
    });
  }
  addOrRemoveListFilterItemValue(id: string, itemValue: any, add: boolean) {
    const me = this;
    let newValue = [];
    let filter = me.getFilter(id);
    if (filter) {
      newValue = filter.value || [];
      // Add value
      if (add) {
        // Valor no está en la lista
        if (newValue.indexOf(itemValue) == -1) {
          newValue.push(itemValue);
        }
      }
      // Remove value
      else {
        newValue = newValue.filter((value: any) => value != itemValue);
      }
      filter.value = newValue;
    }
    me.fireEvent();
  }

  fireEvent() {
    this.filtersChange.emit(this.getActiveFilters());
  }

  /**
   * Retorna solo los filtros activos
   */
  getActiveFilters() {
    let out = this.filters.filter((filter) => {
      if (filter.type == 'list') {
        return filter.value && filter.value.length;
      }
      return filter.active;
    });
    return out;
  }
  getFilter(id: string): CollectionFilter | null {
    const me = this;
    let out = null;
    me.filters.forEach((item) => {
      if (item.id == id) {
        out = item;
      }
    });
    return out;
  }
}
