// Suggested types: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'percent' | 'icon' | 'link' | 'image' | 'custom'

export interface Action {
  text?: string;
  tooltip?: string;
  icon?: string;
  color?: string;
  cls?: string;
  handler: (row: any) => void;
}
export interface BaseColumn {
  text: string;
  sortable?: boolean;
}
export interface DataColumn extends BaseColumn {
  field: string;
  dataType?: 'text' | 'number' | 'date';
}
export interface ActionColumn extends BaseColumn {
  name: string;
  actions: Action[];
  stickyEnd?: boolean;
}

export type Column = DataColumn | ActionColumn;

export interface GridColumn extends DataColumn, ActionColumn {
  type: 'data' | 'actions';
}
