export interface NavItemModel {
  icon: string;
  text: string;
  route?: string;
  children?: NavItemModel[];
}
