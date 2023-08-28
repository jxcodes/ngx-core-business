/**
 * A type representing comparison operators used in queries or conditions.
 * These operators define how values are compared.
 */
export type ComparisonOperator =
  | '='     // Equal to
  | '<'     // Less than
  | '>'     // Greater than
  | '<='    // Less than or equal to
  | '>='    // Greater than or equal to
  | '!'     // Not
  | '<>'    // Not equal to (also known as "!=")
  | '!<>'   // Not between
  | '~'     // Contains
  | '!~'    // Does not contain
  | '.~'    // Starts with
  | '~.'    // Ends with
  | '!.~'   // Does not start with
  | '!~.';  // Does not end with
