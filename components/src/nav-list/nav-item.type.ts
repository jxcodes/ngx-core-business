export interface NavItem {
  id: number | string;
  icon?: string;
  text: string;
  route?: string;
  children?: NavItem[];
  // Optional properties
  [key: string]: any;
}
