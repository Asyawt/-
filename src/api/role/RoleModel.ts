// 角色列表查询参数
export interface RoleListParm{
  userId:string| number,
  currentPage:number,
  pageSize:number,
  name:string,
  total:number
}
export interface AddRoleModel{
  id:number|string,
  name:string,
  createUser:string|number,
  type:string,
  remark:string
}
export interface DeleteParm{
  id:number|string,
}
export interface AssignTreeParm{
  userId:number|string,
  roleId:number|string
}
export interface AssignSaveParm{
  roleId:string|number
  list:Array<string|number>
}