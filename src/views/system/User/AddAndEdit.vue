<template>
  <SysDialog @onClose="onClose" @onConfirm="confirm" :title="dialog.title" :visible="dialog.visible" :width="dialog.width" :height="dialog.height">
    <template #content>
      <el-form :model="addModel" ref="addUserForm" :rules="rules" label-width="80px" size="default">
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="所属部门" prop="deptName">
              <el-input v-model="addModel.deptName" @click="selectParent"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="姓名" prop="loginName">
              <el-input v-model="addModel.loginName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="电话" prop="mobile">
              <el-input v-model="addModel.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="addModel.nickName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addModel.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="登录名" prop="username">
              <el-input v-model="addModel.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0" v-if="addModel.type != '1'">
            <el-form-item label="密码" prop="password">
              <el-input v-model="addModel.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="姓别" prop="sex">
              <el-radio-group v-model="addModel.sex">
                <el-radio :label="'0'">男</el-radio>
                <el-radio :label="'1'">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
  <!-- 填写对话框信息时弹出的对话框 -->
  <parent ref="parentRef" @selectNode="select"></parent>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog'
import useAddAndEdit from '@/composables/user/useAddAndEdit'
import useBaseModel from '@/composables/user/useBaseModel'
import parent from '../department/parent.vue'
import useSelectParent from '@/composables/department/useSelectParent'
// 基础属性
const { addModel, rules } = useBaseModel()
// 弹框属性
const { dialog, onShow, onClose } = useDialog()
const emits = defineEmits(['save'])

const { confirm, show, addUserForm, select } = useAddAndEdit(dialog, onShow, onClose, addModel, emits)

const { parentRef, selectParent } = useSelectParent()
// 暴露
defineExpose({
  show
})
</script>
<style scoped lang="scss"></style>
