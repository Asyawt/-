import { AddMenuModel } from "@/api/menu/menuModel"
import { EditType } from "@/type/BaseEnum"
import { addMenuApi,editMenuApi,deleteMenuApi} from "@/api/menu/menu"
import {ref} from 'vue'
import { Result } from "@/http/request"
import useInstance from "@/hooks/useInstance"
export default function useMenu(getMenuTable){
  const addMenuRef = ref<{ show: (type: string, row?: any) => void }>()
const {global}=useInstance()
  // 新增
  const addBtn=()=>{

    addMenuRef.value?.show(EditType.ADD)
  }
  // 编辑
  const editBtn=(row)=>{
    addMenuRef.value?.show(EditType.EDIT,row)
  }
  // 删除
  const deleteBtn=async(id:number)=>{
   let confirm=await global.$myconfirm('确定删除该数据吗？')
   if(confirm){
    let res=await deleteMenuApi(id)
    if(res && res.code==200){
      global.$message({
        type:'success',
        message:res.msg
      })
      // 刷新表格
      getMenuTable()
    }
   }
  }
  // 保存
  const save=async(data:AddMenuModel)=>{
    // console.log(data);
    let res:Result
    if(data.editType==EditType.ADD){
      res=await addMenuApi(data)
    }else{
      res=await editMenuApi(data)
    }
    if(res && res.code==200){
      global.$message({
        type:'success',
        message:res.msg
      })
      // 刷新表格
      getMenuTable()
    }
  }
  return{
    addBtn,
    editBtn,
    deleteBtn,
    save,
    addMenuRef
  }
}