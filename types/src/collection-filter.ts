import { CollectionFilterType } from './collection-filter-type';
import { ComparisonOperator } from './comparison-operator';

/**
 * Represents a filter configuration used for collections.
 */
export interface CollectionFilter {
  /**
   * Unique identifier for the filter.
   */
  id: string;

  /**
   * Type of the filter.
   */
  type: CollectionFilterType;

  /**
   * Field or property on which the filter operates.
   */
  field: string;

  /**
   * Value(s) to filter with.
   */
  value?: any | any[];

  /**
   * Value(s) used when 'active' is set to false.
   */
  inactiveOnValue?: any | any[];

  /**
   * Indicates whether the filter is active.
   */
  active?: boolean;

  /**
   * Operator to use for comparison.
   */
  operator: ComparisonOperator;
}
