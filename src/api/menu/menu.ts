import http from '@/http/http'
import { AddMenuModel } from './menuModel'
enum Api{
  getMenuList='/api/sysUser/getMenuList',
  getTable='/api/menu/list',
  getParent='/api/menu/parent',
  add='/api/menu',
  delete='/api/menu'
}
// 获取菜单
export const getMenuListApi=()=>http.get(Api.getMenuList)
// 获取菜单列表
export const getMenuTableApi=()=>http.get(Api.getTable)
// 获取上级菜单
export const getParentApi=()=>http.get(Api.getParent)
// 新增
export const addMenuApi=(parm:AddMenuModel)=>http.post(Api.add,parm)
// 编辑
export const editMenuApi=(parm:AddMenuModel)=>http.put(Api.add,parm)
// 删除
export const deleteMenuApi=(id:number)=>http.delete(Api.delete,{id:id})