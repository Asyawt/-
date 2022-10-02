import http from '@/http/http'
import { ListParm } from './DeptModel'
import { AddDeptModel } from './DeptModel'
enum Api{
  getDepList='/api/department/list',
  getDeptParent='/api/department/parent',
  add='/api/department',
  edit='/api/department',
  delete='/api/department'
}
// 查询部门列表
export const getDeptListApi=(parms:ListParm)=>http.get(Api.getDepList,parms)
// 查询上级部门树
export const getDeptParentApi=()=>http.get(Api.getDeptParent)
// 新增
export const addDeptApi=(parms:AddDeptModel)=>http.post(Api.add,parms)
//编辑
export const editDeptApi=(parms:AddDeptModel)=>http.put(Api.edit,parms)
// 删除
export const deleteDeptApi=(parms:any)=>http.delete(Api.edit,parms)