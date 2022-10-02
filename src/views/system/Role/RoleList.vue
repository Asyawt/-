<template>
  <el-main height="">
    <!-- 搜索栏 -->
    <el-form :model="listParm" label-width="80px" :inline="true" size="default">
      <el-form-item label="">
        <el-input v-model="listParm.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜素</el-button>
        <el-button :icon="Close" @click="resetBtn">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="addBtn" v-permission="['sys:role:add']">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="roleTable.list" border stripe :height="tableHeight">
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="remark" label="角色备注"></el-table-column>
      <el-table-column label="操作" align="center" width="320">
        <template #default="{ row }">
          <el-button type="primary" size="default" @click="editBtn(row)" :icon="Edit" v-permission="['sys:role:edit']">编辑</el-button>
          <el-button type="primary" size="default" @click="assignPermission(row.id, row.name)" :icon="Setting">分配权限</el-button>
          <el-button type="danger" size="default" @click="deleteBtn(row)" :icon="Delete" v-permission="['sys:role:delete']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="listParm.currentPage" :page-sizes="[10, 20, 40]" :page-size="listParm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listParm.total" background> > </el-pagination>
  </el-main>
  <!-- 新增编辑弹框 -->
  <AddRole ref="addRoleRef" @save="save"></AddRole>
  <!-- 分配角色弹框 -->
  <AssignMenu ref="assignMenuRef"></AssignMenu>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { Search, Edit, Plus, Setting, Close, Delete } from '@element-plus/icons-vue'
import useRoleTable from '@/composables/role/useRoleTable'
import useRole from '@/composables/role/useRole'
import AddRole from './AddRole.vue'
import AssignMenu from './AssignMenu.vue'
// 表格列表
const { getRoleList, listParm, roleTable, sizeChange, currentChange, searchBtn, resetBtn } = useRoleTable()
// 功能模块
const { addBtn, editBtn, deleteBtn, save, assignPermission, addRoleRef, assignMenuRef } = useRole(getRoleList)

// 表格高度,为了让分页器固定不会随着表格高度的增加位置发生变化，就给表格添加一个高度
const tableHeight = ref(0)
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 230
  })
})
</script>
<style scoped lang="scss"></style>
