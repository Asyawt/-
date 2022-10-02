<template>
  <el-tree ref="parentTree" :data="treeData.data" :props="defaultProps" @node-click="handleNodeClick" node-key="id" default-expand-all :highlight-current="true" :expand-on-click-node="false">
    <template #default="{ node, data }">
      <div class="custom-tree-container">
        <!-- 长度为0说明没有下级 -->
        <span v-if="data.children.length == 0">
          <cumentRemoveDo style="width: 1.3em; height: 1.3em; margin-right: 5px; color: #8c8c8c"></cumentRemoveDo>
          <!-- <el-icon><DocumentRemove /></el-icon> el-icon相当于外层的span -->
        </span>
        <span v-else @click.stop="openBtn(data)">
          <!-- component定义动态组件 ，字体图标相当于一个组件，用起来-->
          <component style="width: 1.1em; height: 1.1em; margin-right: 5px; color: #8c8c8c" :is="data.open ? Plus : Minus" />
        </span>
        <!-- 或者也可以写成<span>{{ node.label }}</span> ,node的属性是:props="defaultProps"添加的而里面的label就相当于返回数据里面的name,自己可以根据自己的需要自己设定-->
        <span>{{ data.name }}</span>
      </div>
    </template>
  </el-tree>
</template>
<script setup lang="ts">
import useLeftTree from '@/composables/user/useLeftTree'
import { Plus, Minus } from '@element-plus/icons-vue'
// 注册事件
const emits = defineEmits(['showTable'])
const { treeData, defaultProps, handleNodeClick, openBtn, parentTree, selectNode } = useLeftTree(emits)
</script>
<style lang="scss">
.el-tree {
  font-size: 14px;
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
    border-left: 1px solid #d9d9d9;
    bottom: 0px;
    height: 100%;
    top: -25px;
    width: 1px;
  }
  //横线
  .el-tree-node:after {
    border-top: 1px solid #d9d9d9;
    height: 20px;
    top: 14px;
    width: 12px;
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
