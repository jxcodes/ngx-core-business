import { QueryFilter } from "./query-filter";
import { QuerySorter } from "./query-sorter";

export interface CollectionQueryParams {
  page?: number;
  limit?: number;
  query?: string;
  sorters?: QuerySorter[];
  filters?: QueryFilter[];
  fields?: string;
}
