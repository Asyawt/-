import { reactive } from "vue"
import { UserListParm } from "@/api/user/userModel"
import { getUserListApi } from "@/api/user/user"
export default function useUserTable(){
  // 定义表格绑定呃数据
  const tableData=reactive({
    list:[]
  })

  // 定义表格查询的参数
  const listParm=reactive<UserListParm>({
    deptId:'',
    pageSize:10,
    currentPage:1,
    total:0,
    loginName:''
  })

  // 查询表格
  const getUserList=async()=>{
    let res=await getUserListApi(listParm)
    console.log('查询成功');
    console.log(res);
    
    
    if(res && res.code==200){
      // 把返回的数据设置表格的数据
      tableData.list=res.data.records
      // 设置分页器的数据
      listParm.total=res.data.total
    }
  }
  // 子组件LeftTree调用父组件的方法，进行展示table表格
  const showTable=async(deptId:number)=>{
    // 收集查询的id
    listParm.deptId=deptId
    //发起请求
    getUserList()
  }
  // 每页展示的数据条数发生变化
 const sizeChange=(size:number)=>{
  listParm.pageSize=size
  // 
  getUserList()
 }
//点击页数时触发
const currentChange=(page:number)=>{
  listParm.currentPage=page
  // 
  getUserList()
}
  return {
    tableData,
    listParm,
    getUserList,
    showTable,sizeChange,currentChange

  }

}