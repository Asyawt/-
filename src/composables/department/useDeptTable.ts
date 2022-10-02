import { reactive, onMounted,ref,nextTick} from "vue";
import { tableDatas } from "@/api/dept/DeptModel";
import { getDeptListApi } from "@/api/dept/dept";
import { ListParm } from "@/api/dept/DeptModel";

// 当前模块主要用于表格列表的业务逻辑
export default function useDeptTable(){
  // 表格的高度
  const tableHeight=ref(0)
  console.log(tableHeight.value);
  
  // 定义列表查询的参数
  const searchName=reactive<ListParm>({
    searchName:''
  })
  // 定义返回的表格的数据
  const tableData=reactive<tableDatas>({
    list:[]
  })
  // 获取表格数据
  const getDeptList=async()=>{
    const res=await getDeptListApi(searchName)
    if(res && res.code==200){
      tableData.list=res.data
    }
  }
  onMounted(() => {
  getDeptList()
  nextTick(()=>{
  tableHeight.value=window.innerHeight-200
 })
// tableHeight.value=window.innerHeight-200
// console.log(tableHeight.value);

  })

  return{
    searchName,
    tableData,
    getDeptList,
    tableHeight
  }
}