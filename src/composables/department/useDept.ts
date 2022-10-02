import { ref } from "vue" 
import { DeptModel,AddDeptModel } from "@/api/dept/DeptModel"
import { EditType } from "@/type/BaseEnum" 
import useInstance from "@/hooks/useInstance"
import { addDeptApi,editDeptApi,deleteDeptApi} from "@/api/dept/dept"
import { Result } from "@/http/request"
import { ListParm } from "@/api/dept/DeptModel"
export default function useDept(getDeptList,searchName:ListParm){
  const {global,proxy}=useInstance()
  // 在父组件在获取子组件实例,const 后面的变量名字必须要和我们定义的子组件身上的ref变量名相同
  // 这里这个实例值,要返回出去,否则访问不到
  // 下面这种方式在打包的时候会报错
  // const addDeptRef=ref<InstanceType<typeof AddAndEdit>>()
  // 第二种解决方式
  const addDeptRef=ref<{show:(type:string,row?:DeptModel)=>void}>()
  // 搜索
  const searchBtn=()=>{
    getDeptList()
  }
  // 重置
  const resetBtn=()=>{
    searchName.searchName=''
    getDeptList()
  }
  // 新增
  const addBtn=()=>{
    addDeptRef.value?.show(EditType.ADD)
  }
  // 编辑
  const editBtn=(row:DeptModel)=>{
    addDeptRef.value?.show(EditType.EDIT,row)
    
  }
  // 删除
  const deleteBtn=async(row:DeptModel)=>{
    // console.log(proxy);
    // console.log(global);
    const confirm=await global.$myconfirm('确定删除该数据吗?')
    if(confirm){
      // 执行删除操作
      const res=await deleteDeptApi({parms:row.id})
      if(res&&res.code==200){
        // 信息提示
        global.$message({
          message: '删除成功',
          type: 'success',
        })
        // 刷新页面
        getDeptList()
      }
    }
  }
  // 保存(更新,新增.确定)
  const save=async(model:AddDeptModel)=>{
    // 拿到收集的新增或者编辑的数据发送请求
    // console.log('111');
    // console.log(model);
    let res:Result
    if(model.type==EditType.ADD){
      // 新增
      res=await addDeptApi(model)
    }else{
      // 编辑
      res=await editDeptApi(model)
    }
    if(res && res.code==200){
      global.$message({
        message: '新增成功',
        type: 'success',
      })
      // 刷新表格页面
      getDeptList()
    }
  }
  return {
    searchBtn,
    addBtn,
    editBtn,
    deleteBtn,
    save,
    addDeptRef,
    resetBtn

  }
}