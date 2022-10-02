import { EditType, Title } from "@/type/BaseEnum"
import { AddMenuModel } from "@/api/menu/menuModel"
import { nextTick, reactive,ref } from "vue"
import { ElForm } from "element-plus"
export default function useAddMenu(dialog, onClose, onShow,emits){
  // 
  const addMenuForm=ref<InstanceType<typeof ElForm>>()
  // 表单验证规则
  const rules = reactive({
    type: [
          {
            required: true,
            trigger: "change",
            message: "请选择菜单类型",
          },
        ],
        parentName: [
          {
            required: true,
            trigger: "change",
            message: "请选择上级菜单",
          },
        ],
        label: [
          {
            required: true,
            trigger: "change",
            message: "请填写菜单名称",
          },
        ],
        name: [
          {
            required: true,
            trigger: "change",
            message: "请填写路由名称",
          },
        ],
        path: [
          {
            required: true,
            trigger: "change",
            message: "请填写路由路径",
          },
        ],
        url: [
          {
            required: true,
            trigger: "change",
            message: "请填写组件路径",
          },
        ],
        code: [
          {
            required: true,
            trigger: "change",
            message: "请填写权限字段",
          },
        ],
        icon: [
          {
            required: true,
            trigger: "change",
            message: "请填写图标",
          },
        ]
})
  
  // 定义表单绑定的数据
 const addMenuModel=reactive<AddMenuModel>({
    id: '',
    editType: '',
    type: '',
    parentId: '',
    parentName: '',
    label: '',
    icon: '',
    name: '',
    path: '',
    url: '',
    code: '',
    orderNum: ''
  })
  // 确定
  const confirm=()=>{
    addMenuForm.value?.validate(valid=>{
      if(valid){
        emits('save',addMenuModel)
        onClose()
      }
    })
 
  }
  // 展示
  const show=(type:string,row)=>{
    type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
  
    onShow()
 
    if(row){
      nextTick(()=>{
        Object.assign(addMenuModel,row)
      })
      // Object.assign(addMenuModel,row)
    }
       // 清空表单
       addMenuForm.value?.resetFields()
      // addMenuModel.parentName=''
    addMenuModel.editType=type
  }
  return {
    confirm
    ,show,
    addMenuModel,
    rules,
    addMenuForm
  }
}