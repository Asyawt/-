<template>
  <el-container :style="{ height: containerHeight + 'px' }">
    <el-aside width="200px" style="border-right: 1px solid #dfe6ec">
      <LeftTree @showTable="showTable"></LeftTree>
    </el-aside>
    <el-main>
      <!-- 搜索栏 -->
      <el-form :model="listParm" label-width="80px" :inline="true" size="default">
        <el-form-item label="">
          <el-input v-model="listParm.loginName" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :icon="Search" @click="searchBtn">搜索</el-button>
          <el-button :icon="Close" @click="resetBtn">重置</el-button>
          <el-button type="primary" :icon="Plus" @click="addBtn" v-permission="['sys:user:add']">新增</el-button>
        </el-form-item>
      </el-form>
      <!-- 用户列表 -->
      <el-table :height="tableHeight" :data="tableData.list" border stripe>
        <el-table-column prop="loginName" label="姓名"> </el-table-column>
        <el-table-column prop="deptName" label="所属部门"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column label="操作" width="320" align="center">
          <template #default="{ row, $index }">
            <el-button size="default" type="primary" :icon="Edit" @click="editBtn(row)" v-permission="['sys:user:edit']">编辑</el-button>
            <el-button size="default" type="primary" :icon="Setting" @click="assignBtn(row)">分配角色</el-button>
            <el-button size="default" type="danger" :icon="Delete" @click="deleteBtn(row.id)" v-permission="['sys:user:delete']">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="listParm.currentPage" :page-sizes="[10, 20, 40]" :page-size="listParm.pageSize" :total="listParm.total" background> </el-pagination>
    </el-main>
  </el-container>
  <!-- 弹框组件 -->
  <AddAndEdit ref="userAddRef" @save="save"></AddAndEdit>
  <!-- 分配角色 -->
  <AssignRole ref="assignRoleRef"></AssignRole>
</template>
<script setup lang="ts">
import { Search, Plus, Close, Delete, Edit, Setting } from '@element-plus/icons-vue'
import LeftTree from './LeftTree.vue'
import { ref, onMounted, nextTick } from 'vue'
import useUserTable from '@/composables/user/useUserTable'
import AddAndEdit from './AddAndEdit.vue'
import useUser from '@/composables/user/useUser'
import { AddUserModel } from '@/api/user/userModel'
import { EditType } from '@/type/BaseEnum'
import { addUserApi, editUserApi } from '@/api/user/user'
import { Result } from '@/http/request'
import useInstance from '@/hooks/useInstance'
import AssignRole from './AssignRole.vue'
// 相当于获取全局的vm实例
const { global } = useInstance()
// 表格展示功能
const { tableData, listParm, getUserList, showTable, sizeChange, currentChange } = useUserTable()
// 表格的增删改查
const { addBtn, editBtn, deleteBtn, assignBtn, userAddRef, assignRoleRef } = useUser(getUserList, global)

const containerHeight = ref(0)
const tableHeight = ref(0)
const save = async (data: AddUserModel) => {
  console.log('xx接收到了')
  console.log(data)
  // 判断是新增还是编辑
  let res: Result
  if (data.type == EditType.ADD) {
    res = await addUserApi(data)
  } else {
    res = await editUserApi(data)
  }
  if (res && res.code == 200) {
    // 刷新数据
    getUserList()
    // 信息提示
    global.$message({
      message: res.msg,
      type: 'success'
    })
  }
}
// 搜索
const searchBtn = () => {
  getUserList()
}
// 重置
const resetBtn = () => {
  ;(listParm.loginName = ''), getUserList()
}
onMounted(() => {
  nextTick(() => {
    containerHeight.value = window.innerHeight - 100
    tableHeight.value = window.innerHeight - 230
  })
})
</script>
