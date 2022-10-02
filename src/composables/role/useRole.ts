import { AddRoleModel } from "@/api/role/RoleModel"
import { EditType } from "@/type/BaseEnum"
import { ref } from "vue"
import { addRoleApi,editRoleApi,deleteRoleApi } from "@/api/role/role"
import { Result } from "@/http/request"
import useInstance from "@/hooks/useInstance"
export default function useRole( getRoleList){
  const {global}=useInstance()
  // 
  const addRoleRef=ref<{show:(type:string,row?:AddRoleModel)=>void}>()
  // 
  const assignMenuRef=ref<{show:(roleId:string,name:string)=>void}>()
  // 新增
  const addBtn=()=>{
    addRoleRef.value?.show(EditType.ADD)

  }

 
  // 编辑
  const editBtn=(row:AddRoleModel)=>{
    addRoleRef.value?.show(EditType.EDIT,row)

  }
    
 
  // 删除
  const deleteBtn=async(row)=>{
    let confirm=await global.$myconfirm('确定删除该数据吗？')

    if(confirm){
      const res=await deleteRoleApi({id:row.id})
      if(res.code==200 &&res){
        global.$message({
          message:res.msg,
          type:'success'
        })
        // 刷新页面
        getRoleList()
      }
    }

  }
    
 
  // 保存
  const save=async(data:AddRoleModel)=>{

    let res:Result
    if(data.type==EditType.ADD){
      res=await addRoleApi(data)
    }else{
      res=await editRoleApi(data)
    }
    if(res&&res.code==200){
      global.$message({
        message:res.msg,
        type:'success'
      })
      getRoleList()
    }
  }
    
 
  // 分配权限
  const assignPermission=(roleId:string,name:string)=>{
    assignMenuRef.value?.show(roleId,name)

  }
    
 return{
  addBtn,
  editBtn,
  deleteBtn,
  save,
  assignPermission,
  addRoleRef,
  assignMenuRef
 }
}