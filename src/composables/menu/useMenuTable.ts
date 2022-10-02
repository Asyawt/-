import { getMenuTableApi } from "@/api/menu/menu";
import { reactive, onMounted } from "vue";

export default function useMenuTable(){
  // 表格数据
  const menuTable=reactive({
    list:[]
  })
  // 获取表格数据
  const getMenuTable=async()=>{
    let res=await getMenuTableApi()
    if(res && res.code==200){
      menuTable.list=res.data
    }
  }
  onMounted(() => {
    getMenuTable()
  })
  return {
    menuTable,
    getMenuTable

  }
}