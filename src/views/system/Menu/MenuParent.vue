<template>
  <SysDialog :title="dialog.title" :width="dialog.width" :visible="dialog.visible" :height="dialog.height" @onClose="onClose" @onConfirm="confirm">
    <template #content>
      <el-tree ref="parentTree" :data="treeData.data" :props="defaultProps" @node-click="handleNodeClick" node-key="id" default-expand-all :highlight-current="true" :expand-on-click-node="false">
        <template #default="{ node, data }">
          <div class="custom-tree-container">
            <!-- 长度为0说明没有下级 -->
            <span v-if="data.children.length == 0">
              <DocumentRemove style="width: 1.3em; height: 1.3em; margin-right: 5px; color: #8c8c8c"></DocumentRemove>
              <!-- <el-icon><DocumentRemove /></el-icon> el-icon相当于外层的span -->
            </span>
            <span v-else @click.stop="openBtn(data)">
              <!-- component定义动态组件 ，字体图标相当于一个组件，用起来-->
              <component style="width: 1.1em; height: 1.1em; margin-right: 5px; color: #8c8c8c" :is="data.open ? Plus : Minus" />
            </span>
            <!-- 或者也可以写成<span>{{ node.label }}</span> ,node的属性是:props="defaultProps"添加的而里面的label就相当于返回数据里面的name,自己可以根据自己的需要自己设定-->
            <span>{{ data.label }}</span>
          </div>
        </template>
      </el-tree>
    </template>
  </SysDialog>
</template>
<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons-vue'
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog'
import useMenuParent from '@/composables/menu/useMenuParent'

// 弹框的属性和功能
const { dialog, onClose, onShow } = useDialog()
// 子向父传值用自定义事件
const emits = defineEmits(['selectNode'])
// 确定弹框事件
const confirm = () => {
  // 关闭弹框
  onClose()
  // 返回收集的数据给父亲
  emits('selectNode', selectNode)
}
// 供父组件使用，显示弹框
const show = async () => {
  //设置弹框属性
  dialog.title = '请选择上级部门'
  dialog.width = 300
  dialog.height = 400
  // 发起请求获取上级部门弹框的内容数据
  getTreeData()
  // 展示上级部门
  onShow()
}
// 弹框上级部门树的基础数据
const { treeData, defaultProps, handleNodeClick, openBtn, parentTree, selectNode, getTreeData } = useMenuParent()
defineExpose({
  show
})
</script>
<style lang="scss">
.el-tree {
  // 将每一行的设置为相对定位 方便后面before after 使用绝对定位来固定位置
  .el-tree-node {
    position: relative;
    padding-left: 10px;
  }
  // 子集像右偏移 给数线留出距离
  .el-tree-node__children {
    padding-left: 20px;
  }
  //这是竖线
  .el-tree-node :last-child:before {
    height: 40px;
  }
  .el-tree > .el-tree-node:before {
    border-left: none;
  }
  .el-tree > .el-tree-node:after {
    border-top: none;
  }
  //这自定义的线 的公共部分
  .el-tree-node:before,
  .el-tree-node:after {
    content: '';
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }
  .tree :first-child .el-tree-node:before {
    border-left: none;
  }
  // 竖线
  .el-tree-node:before {
    border-left: 1px dotted #d9d9d9;
    bottom: 0px;
    height: 100%;
    top: -25px;
    width: 1px;
  }
  //横线
  .el-tree-node:after {
    border-top: 1px dotted #d9d9d9;
    height: 20px;
    top: 14px;
    width: 24px;
  }
  .el-tree-node__expand-icon.is-leaf {
    width: 8px;
  }
  //去掉elementui自带的展开按钮  一个向下的按钮,打开时向右
  .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
  }
  //每一行的高度
  .el-tree-node__content {
    line-height: 30px;
    height: 30px;
    padding-left: 10px !important;
  }
}
//去掉最上级的before  after 即是去电最上层的连接线
.el-tree > div {
  &::before {
    display: none;
  }
  &::after {
    display: none;
  }
}
</style>
