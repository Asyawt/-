import http from "@/http/http";
import { RoleListParm , AddRoleModel, DeleteParm, AssignTreeParm, AssignSaveParm} from "./RoleModel";

enum Api{
  getList='/api/role/list',
  add='/api/role',
  assignTree='/api/role/getAssignPermissionTree',
  assignSave='/api/role/roleAssignSave'
}
// 角色列表
export const getRoleListApi=(parm:RoleListParm)=>http.get(Api.getList,parm)
// 新增角色
export const addRoleApi=(parm:AddRoleModel)=>http.post(Api.add,parm)
// 编辑
export const editRoleApi=(parm:AddRoleModel)=>http.put(Api.add,parm)
// 删除
export const deleteRoleApi=(parm:DeleteParm)=>http.delete(Api.add,parm)
// 分配权限树的数据
export const assignTreeApi=(parm:AssignTreeParm)=>http.get(Api.assignTree,parm)
// 分配权限保存
export const assignSaveApi=(parm:AssignSaveParm)=>http.post(Api.assignSave,parm)