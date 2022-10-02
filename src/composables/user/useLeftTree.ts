import { reactive,ref,onMounted,nextTick} from "vue";
import { DeptModel } from "@/api/dept/DeptModel"; 
import { ElTree } from "element-plus";
import { getLeftTreeApi } from "@/api/user/user";

export default function useLeftTree(emits){
  // 通过树的ref属性获取树的实例
  const parentTree=ref<InstanceType<typeof ElTree>>()
  // 上级树的基础数据
  const treeData=reactive({
    data:[]
  })
  const defaultProps = {
    children: 'children',
    label: 'name',
  }
  // 定义点击每一项选中收集的数据
  const selectNode=reactive({
    id:-1,
    name:''
  })

  onMounted(()=>{
    getTreeData()
 
  })

  const handleNodeClick = (data: DeptModel) => {
    console.log('点击了');
    console.log(data)
    selectNode.id=data.id,
    selectNode.name=data.name

    // 触发右边表格数据的方法，传递一个id
    emits('showTable',data.id)
  }
  // 获取树的数据
  const getTreeData=async()=>{
    let res=await getLeftTreeApi()
    if(res && res.code==200){
      treeData.data=res.data
         // 处理默认选中第一个节点
    nextTick(()=>{
      const nodes=document.querySelector('.el-tree-node') as any
      if(nodes){
        nodes.click()
      }
    })
    }
  }
  // 加号和减号的点击事件切换图标组件，通过修改返回的data里面的open属性
  const openBtn=(data: DeptModel)=>{
    //设置展开或者关闭
 
    data.open=!data.open
  
   if(parentTree.value){
    // ????
    parentTree.value.store.nodesMap[data.id].expanded=!data.open
    

   }
    
    
  }
  return {
    treeData,
    defaultProps,
    handleNodeClick,
    openBtn,
    parentTree,
    selectNode,
    
  }
}