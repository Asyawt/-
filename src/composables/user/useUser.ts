import { EditType } from '@/type/BaseEnum'
import {ref} from 'vue'
import { AddUserModel } from '@/api/user/userModel'
import { deleteUserApi } from '@/api/user/user'

export default function useUser(getUserList,global){
  // 分配角色组件的ref
  const assignRoleRef=ref<{show:(name:string,useId:string|number)=>void}>()
  // 获取子组件，调用里面的方法
  const userAddRef=ref<{show:(type:string,row?:AddUserModel)=>void}>()
// 新增
const addBtn=()=>{
  userAddRef.value?.show(EditType.ADD)
}
// 编辑
const editBtn=(row:AddUserModel)=>{
  userAddRef.value?.show(EditType.EDIT,row)
}
// 删除
const deleteBtn=async(id:number)=>{
  // 信息提示
let confirm=await global.$myconfirm('确定删除该数据吗？')
if(confirm){
  let res=await deleteUserApi({id})
  if(res && res.code==200){
    global.$message({
      message:res.msg,
      type:'success'
    })
    // 刷新
    getUserList()
  }
}
  
}
// 分配角色
const assignBtn=(row:AddUserModel)=>{
  assignRoleRef.value?.show(row.loginName,row.id)
}
  return {
    addBtn,
    editBtn,
    deleteBtn,
    assignBtn,
    userAddRef,
    assignRoleRef
  }
}