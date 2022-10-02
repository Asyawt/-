import { DialogModel } from "@/type/BaseType"
import { assignTreeApi,assignSaveApi } from "@/api/role/role"
import { AssignSaveParm, AssignTreeParm } from "@/api/role/RoleModel"
import { reactive,ref } from "vue"
import { getUserId } from "@/utils/auth"
import { ElTree } from "element-plus"
import useInstance from "@/hooks/useInstance"
export default function useAssignMenu(dialog:DialogModel,onClose,onShow){
  const {global}=useInstance()
  // 
const assignTree=ref<InstanceType<typeof ElTree>>()
//  树的属性配置
const defaultProps=reactive({
  children:'children',
  label:'label'
})
  // 权限树的数据和默认角色权限的id
  const assignTreeData=reactive({
    list:[],
    assignTreeChecked:[]
  })
  // 定义分配权限保存的参数
  const saveParm=reactive<AssignSaveParm>({
    roleId:'',
    list:[]
  })
  // 确定
  const confirm=async()=>{
    // 获取选中的数据，通过eltree实例调用里面的方法getCheckedKeys获取选中的数据
    let checkedIds=assignTree.value?.getCheckedKeys(false) || []
    // console.log('x1');
    // console.log(checkedIds);
    // 获取半节点（父级
    let hlfIds=assignTree.value?.getHalfCheckedKeys() || []
    saveParm.list=checkedIds?.concat(hlfIds)
    // console.log('sfd');
    
    // console.log(saveParm.list);
    
    // 提交保存
    let res=await assignSaveApi(saveParm)
    if(res && res.code==200){
      global.$message({
        message:res.msg,
        type:'success'
      })
      onClose()
    }
    
  }
  // 显示
  const show=(roleId:string,name:string)=>{
    dialog.height=420
    dialog.width=300
    dialog.title='为【'+name+'】分配角色'
    // 设置角色id
    saveParm.roleId=roleId
    // 查询权限树的数据和默认权限数据
    const parm={
      roleId:roleId,
      userId:getUserId() || ''
    }
    getAssignTree(parm)
    onShow()
  }
  const getAssignTree=async(parm:AssignTreeParm)=>{
    let res=await assignTreeApi(parm)
    if(res && res.code==200){
      // 设置权限树数据
      assignTreeData.list=res.data.listmenu
      // 设置角色默认原来已有的权限id
      assignTreeData.assignTreeChecked=res.data.checkList
      // 数据回显，判断角色原来是否已经分配过权限，如果有则回显，且返回的数据不能直接使用，需要整理，原因：
      // 是el默认选择导致的
      if(assignTreeData.assignTreeChecked.length>0){
        let newArr=[]
        assignTreeData.assignTreeChecked.forEach(item=>{
          checked(item,assignTreeData.list,newArr)
        })
        assignTreeData.assignTreeChecked=newArr
      }
    }
  }
  const checked=(id,data,newArr)=>{
    data.forEach((item)=>{
      if(item.id==id){
        //这个方法也很巧妙！！
        // 这个方法总的思路就是剔除了在父级id和原有权限id相同，且当前父级的children的长度不等于零的情况下的父级id，是为了不让el选中了当前父级，而把他的全部子级全部选中
        // 这里这个 if(item.children && item.children.length==0)判断的意义在于，如果我们选中了上级的id,
        // 那么el-puls及老版本的el会把它下面的children所有都会默认被全部选中，显然不符合我们的要求，所以要找children字段为0的，才选中其父级
        if(item.children && item.children.length==0){
          newArr.push(item.id)
        }
      }else{
        if(item.children && item.children.length!=0){
          // 递归
          checked(id,item.children,newArr)
        }
      }
    })
  }
  return {
    confirm,
    show,
    assignTreeData,
    defaultProps,
    assignTree
  }
}