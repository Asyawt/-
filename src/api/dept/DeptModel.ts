// 查询列表的参数类型
export  interface ListParm{
  searchName:string
}
// 返回的表格数据(复杂)
export interface tableDatas{
  list:any
}
//表格数据 这个与上面的tableDatas类型一样
export interface DeptModel {
  id: number;
  pid: number;
  likeId: number;
  parentName: string;
  manager: string;
  name: string;
  deptCode: string;
  deptAddress: string;
  deptPhone: string;
  orderNum: number;
  open: boolean;
  children: any
}
//新增,编辑  表单提交的数据类型
export interface AddDeptModel {
  type: string;
  id: string | number;
  pid: string |number;
  parentName: string;
  manager: string;
  deptAddress: string;
  deptPhone: string;
  name: string;
  deptCode: string;
  orderNum: string;
}
