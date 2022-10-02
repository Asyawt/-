

// 登录请求参数类型
export interface loginParam{
  username:string,
  password:string,
  code:string
}
//登陆成功返回参数类型
export interface loginResult{
  code:number,
  token:string,
  expireTime:number
  id:number
}
// 用户权限信息接口请求成功返回数据类型
export interface userInfo{
  avatar:string;
  id:string;
  introduction:string;
  name:string;
  roles:Array<string>,

}
// 获取用户列表查询参数
export interface UserListParm{
  deptId:string | number;
  loginName:string;
  currentPage:number;
  pageSize:number;
  total:number;
}
// 表单提交的参数
export interface AddUserModel{
  type:string,
  id:string | number
  deptId:string | number
  deptName:string
  loginName:string
  mobile:string
  nickName:string
  email:string
  username:string
  password:string
  sex:string
}
/**
 * 分配角色列表参数
 */
 export interface AssignRoleListParm {
  currentPage: number,
  pageSize: number,
  userId: string | number,
  total: number,
}