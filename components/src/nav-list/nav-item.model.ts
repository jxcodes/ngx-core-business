export interface NavItemModel {
  id: number | string;
  icon: string;
  text: string;
  route?: string;
  children?: NavItemModel[];
}
