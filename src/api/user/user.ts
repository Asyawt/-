import http from "@/http/http";
import { AssignRoleListParm, loginParam,loginResult } from "./userModel";
import { userInfo } from "./userModel";
import { UserListParm } from "./userModel";
import { AddUserModel } from "./userModel";
enum Api{
  getImg='/api/sysUser/image',
  login='/api/user/login',
  getInfo = '/api/sysUser/getInfo',
  getLeftTree='/api/department/list',
  getUserList='/api/user/list',
  addAndEdit='/api/user',
  getRoleList='/api/user/getRolistForAssign',
  getRoleId = '/api/user/getRoleIdByUserId',
  assignSave = '/api/user/assingRole',
  loginOut = '/api/sysUser/loginOut',
  restore = '/api/backup/restore'
}
// 获取验证码图片
export async function getImagApi(){
 return await http.getImage(Api.getImg)
}
// 登录
export async function loginApi(params:loginParam) {
  
  return await http.login<loginResult>(Api.login,params)
}
//  根据token请求用户权限信息接口对接
export const getInfoApi=()=> http.get<userInfo>(Api.getInfo)
// 获取用户部门树
export const getLeftTreeApi=()=>http.get(Api.getLeftTree)

// 获取用户列表
export const getUserListApi=(parms:UserListParm)=>http.get(Api.getUserList,parms)
// 新增用户
export const addUserApi=(parms:AddUserModel)=>http.post(Api.addAndEdit,parms)
// 编辑用户
export const editUserApi=(parms:AddUserModel)=>http.put(Api.addAndEdit,parms)
// 删除用户
export const deleteUserApi=(id)=>http.delete(Api.addAndEdit,id)
// 获取分配角色弹框列表
export const getRoleListApi=(parm:AssignRoleListParm)=>http.get(Api.getRoleList,parm)
// 查询用户原来拥有的角色id,（即拥有的权限
export const getRoleIdApi=(userId:number | string)=>http.getRestApi(Api.getRoleId,{userId})
// 分配角色确定保存
export const assignRoleSaveApi=(parm)=>http.post(Api.assignSave,parm)
// 退出登录
export const loginOutApi=(parm)=>http.post(Api.loginOut,parm)
// 还原数据
export const restoreApi=()=>http.post(Api.restore)