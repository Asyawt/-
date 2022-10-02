export interface AddMenuModel {
  id: number | string;
  editType: string;
  type: string;
  parentId: string | number;
  parentName: string;
  label: string;
  icon: string;
  name: string;
  path: string;
  url: string;
  code: string;
  orderNum: string | number;
}