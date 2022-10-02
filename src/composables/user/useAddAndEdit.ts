import { EditType, Title } from "@/type/BaseEnum"
import { DialogModel } from "@/type/BaseType"
import { ElForm } from "element-plus"
import { ref, nextTick } from "vue"
import { AddUserModel } from "@/api/user/userModel"


export default function useAddAndEdit(dialog:DialogModel, onShow, onClose,addModel:AddUserModel,emits){

  // 表单的验证规则
  const addUserForm=ref<InstanceType<typeof ElForm>>()
  // 弹框确定

  const confirm=()=>{
    // 表单验证
    addUserForm.value?.validate((valid)=>{
      if(valid){
        emits('save',addModel)
        onClose()
      }
    })
   
  }
  const show=(type:string,row?:AddUserModel)=>{
    // 清空表单
    addUserForm.value?.resetFields()
    // 设置弹框属性
    type==EditType.ADD?dialog.title=Title.ADD:dialog.title=Title.EDIT
    if(type==EditType.ADD){
      addModel.password=''
    }
    // 显示弹框
    onShow()
    // 设置是新增还是编辑
   addModel.type=type
  //  如果是编辑，把编辑的数据复制在表单绑定的model里面
  if(row){
    nextTick(()=>{
      Object.assign(addModel,row)
    })
  }
  }
  // 接受子组件收集回来的数据
const select = (data: any) => {
  addModel.deptId = data.id
  addModel.deptName = data.name
  console.log('xx');
  console.log(addModel);
  
  
}
  return {
    confirm,
    show,
    addUserForm,
    select
  }
}