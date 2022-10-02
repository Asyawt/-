import { getRoleListApi } from "@/api/role/role";
import { RoleListParm } from "@/api/role/RoleModel";
import { getUserId } from "@/utils/auth";
import { reactive,onMounted } from "vue";

export default function useRoleTable(){
  // 定义表格数据
  const roleTable=reactive({
    list:[]
  })
  // 定义列表查询的参数
  const listParm=reactive<RoleListParm>({
    userId:getUserId() || '',
    currentPage:1,
    pageSize:10,
    name:'',
    total:0
  })
  // 获取角色列表
  const getRoleList=async()=>{
    let res=await getRoleListApi(listParm)
    if(res && res.code==200){
      roleTable.list=res.data.records
      listParm.total=res.data.total
    }
  }
  onMounted(() => {
    getRoleList()
  })
 const sizeChange=(size:number)=>{
  listParm.pageSize=size
 }
 const currentChange=(size:number)=>{
  listParm.currentPage=size
}
// 搜素
const searchBtn=()=>{
  getRoleList()
}
// 重置
const resetBtn=()=>{
  listParm.name=''
  getRoleList()
}
  return {
    getRoleList,
    listParm,
    roleTable,sizeChange,currentChange,
    searchBtn,resetBtn
  }
}