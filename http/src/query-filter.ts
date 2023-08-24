export type FilterOperator =
  | '='
  | '<'
  | '>'
  | '<='
  | '>='
  | '!'
  | '<>' // Between
  | '!<>' // No Between
  | '~' // contiene
  | '!~' // No contiene
  | '.~' // Inicia con
  | '~.' // Termina con
  | '!.~' // No empieza con
  | '!~.'; // No termine con
export interface QueryFilter {
  id: string;
  type: 'list' | 'date' | 'string' | 'numeric' | 'boolean' | 'enum';
  field: string;
  value?: any | any[];
  activeFalseValue?: any | any[];
  active?: boolean;
  operator: FilterOperator;
}
