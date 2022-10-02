import { reactive, ref,onMounted, nextTick } from "vue"
import { getRoleListApi,getRoleIdApi,assignRoleSaveApi } from "@/api/user/user"
import { getUserId } from "@/utils/auth"
import { AssignRoleListParm } from "@/api/user/userModel"
import useInstance from "@/hooks/useInstance"
export default function useAssignRole(dialog,onClose,onShow){
  const {global}=useInstance()
  // 表格高度
  const tableheight=ref(0)
  // 被分配角色用户的id
  const selectUserId=ref<string|number>('')
  // 选择的角色id
  const selectRoleId=ref('')
  // 确定
  const confirm=async()=>{
    // 确定
    if(!selectRoleId.value){
      global.$message({
        message:'请选择角色',
        type:'warning'
      })
      return
    }
    const parm={
      roleId:selectRoleId.value,
      userId:selectUserId.value
    }
    let res=await assignRoleSaveApi(parm)
    if(res && res.code==200){
      global.$message({
        type:'success',
        message:'分配成功'
      })
      onClose()
    }
 
  }
  // 展示
 const show=async(name:string,userId:string|number)=>{
  // 设置用户的id
  selectUserId.value=userId
  // 每次展示先清空上次的角色id
  selectRoleId.value=''
  // 设置该用户的原来的角色id,展示的单选按钮可以默认选中
  let res=await getRoleIdApi(userId)
  if(res && res.data){
    selectRoleId.value=res.data.roleId
  }
  // 设置弹框标题
  dialog.title='为【'+name+'】分配角色'
  onShow()
 }
//  角色列表数据
const roleList=reactive({
  list:[]
})
// 角色查询参数
const parms=reactive<AssignRoleListParm>({
  currentPage:1,
  pageSize:4,
  userId:getUserId() || '',
  total:0
})
// 获取列表的数据
const getRoleList=async()=>{
let res=await getRoleListApi(parms)
if(res && res.code==200){
  roleList.list=res.data.records
  parms.total=res.data.total
}
}
onMounted(()=>{
  getRoleList(),
  nextTick(()=>{
    tableheight.value=window.innerHeight-690
  })
})
const sizeChange=(size:number)=>{
parms.pageSize=size
getRoleList()
}
const currentChange=(size:number)=>{
parms.currentPage=size
getRoleList()
}
// 单选按钮的点击事件
const getSlectRole=(row)=>{
// selectRoleId.value=row.id
console.log('xxx1');

console.log(selectRoleId.value);

}
  return {
    confirm,
    show,
    parms,
    roleList,
    sizeChange,currentChange,
    tableheight,
    selectRoleId,
    getSlectRole
  }
}