import { Component, Input, ViewChild } from '@angular/core';
import { Column, GridColumn } from './column';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'ngbiz-grid',
    templateUrl: './grid.component.html',
    styleUrl: './grid.component.scss',
    standalone: false
})
export class GridComponent {
  @Input() data: any[] = [];
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  displayedColumns: string[] = [];
  selectedRowIndex = -1;
  cols: GridColumn[] = [];
  @Input()
  set columns(columns: Column[]) {
    this.cols = columns.map((column: any) => {
      if (column.field) {
        column.type = 'data';
        column.name = column.field;
      } else {
        column.type = 'actions';
      }
      return column;
    });
    this.displayedColumns = Array.from(this.cols, column => column.name);
  }
  @Input() pageIndex = 0;
  @Input() pageSize = 10;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  getTableCls(): string[] {
    return ['ngbiz-custom-material__mat-table--lite', this.size];
  }
  getActionsColWidth(col: GridColumn): number {
    return col.actions.length * 48;
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
}
