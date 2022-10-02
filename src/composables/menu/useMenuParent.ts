import { reactive,ref } from "vue";

import { ElTree } from "element-plus";
import { getParentApi } from "@/api/menu/menu";
export default function useMenuParent(){
  // 通过树的ref属性获取树的实例
  const parentTree=ref<InstanceType<typeof ElTree>>()
  // 上级树的基础数据
  const treeData=reactive({
    data:[]
  })
  const defaultProps = {
    children: 'children',
    label: 'label',
  }
  // 定义点击每一项选中收集的数据
  const selectNode=reactive({
    id:-1,
    name:''
  })

  const handleNodeClick = (data:any) => {
    // console.log(data)
    selectNode.id=data.id,
    selectNode.name=data.label
    console.log( selectNode);
    
  }
  // 加号和减号的点击事件切换图标组件，通过修改返回的data里面的open属性
  const openBtn=(data:any)=>{
    //设置展开或者关闭
 
    data.open=!data.open
  
   if(parentTree.value){
    // ????
    parentTree.value.store.nodesMap[data.id].expanded=!data.open
    

   }

  }
    // 获取树的数据
  const getTreeData=async()=> {
    let res=await getParentApi()
    if(res && res.code==200){
      treeData.data=res.data
    }
  } 
  return {
   
    treeData,
    defaultProps,
    handleNodeClick,
    openBtn,
    getTreeData,
    parentTree,
    selectNode,

  }
}