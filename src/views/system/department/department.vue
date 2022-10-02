<template>
  <el-main height="">
    <!-- 搜索栏 -->

    <el-form :model="searchName" label-width="80px" :inline="true" size="default">
      <el-form-item label="">
        <el-input v-model="searchName.searchName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜素</el-button>
        <el-button :icon="Close" @click="resetBtn">重置</el-button>
        <el-button :icon="Plus" type="primary" @click="addBtn" v-permission="['sys:addDepartment']">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="tableData.list" style="width: 100%" default-expand-all row-key="id" border:boolean :tree-props="{ children: 'children' }">
      <el-table-column prop="name" label="部门名称" />
      <el-table-column prop="deptCode" label="部门编码" />
      <el-table-column prop="deptPhone" label="部门电话" />
      <el-table-column label="操作" width="200px" align:string="center">
        <template #default="{ row, $index }">
          <el-button type="primary" size="default" :icon="Edit" @click="editBtn(row)" v-permission="['sys:editDept']">编辑</el-button>
          <el-button size="default" type="danger" :icon="Close" @click="deleteBtn(row)" v-permission="['sys:deleteDept']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
  <!-- 新增或编辑的弹框 -->
  <AddAndEdit ref="addDeptRef" @save="save"></AddAndEdit>
</template>
<script setup lang="ts">
import { Edit, Search, Plus, Close } from '@element-plus/icons-vue'
import useDeptTable from '@/composables/department/useDeptTable'
import useDept from '@/composables/department/useDept'
import AddAndEdit from './AddAndEdit.vue'
// 表格列表
const { searchName, tableData, getDeptList, tableHeight } = useDeptTable()
// 这里吧请求表格数据的请求传值到了useDept模块，在useDept里面接受即可使用（ts的方法互传）
// 表格的操作  搜索,新增,编辑,删除
const { searchBtn, addBtn, editBtn, deleteBtn, save, addDeptRef, resetBtn } = useDept(getDeptList, searchName)
</script>
<style scoped lang="scss"></style>
