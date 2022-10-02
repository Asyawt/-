import { EditType, Title } from "@/type/BaseEnum"
import { DialogModel } from "@/type/BaseType"
import { nextTick, reactive,ref} from "vue"
import { AddRoleModel } from "@/api/role/RoleModel"


export default function useAddRole(dialog,onClose,onShow,addRoleForm,emits){


  // 表单绑定的数据
  const addModel=reactive<AddRoleModel>({
    id:'',
    name:'',
    createUser:'',
    type:'',
    remark:''
  })
  // 表单验证规则
  const rules=reactive({
    name:[{
      trigger:'change',
      required:true,
      message:'请填写角色名称'
    }]


  })
 
  // 确定
  const confirm=async(formel)=>{
  
    
    // 表单验证
   await formel.validate(valid=>{
      if(valid){
        console.log('11');
        emits('save',addModel)
        onClose() 
      }
    })


  }
  // 显示
  const show=(type:string,row:AddRoleModel)=>{
    type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
    onShow()
    // 清空表单
    addRoleForm.value?.resetFields()
  //  编辑
  if(row){
   nextTick(()=>{
    Object.assign(addModel,row)
   })
  }
    // 设置编辑or新增的属性
    addModel.type=type
  }
  return {
    confirm,
    show,
    addModel,
    rules,
   
  }
}