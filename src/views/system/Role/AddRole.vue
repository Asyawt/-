<template>
  <SysDialog :title="dialog.title" :visible="dialog.visible" :width="dialog.width" :height="dialog.height" @onClose="onClose" @onConfirm="confirm(addRoleForm)">
    <template #content>
      <el-form :model="addModel" ref="addRoleForm" :rules="rules" label-width="80px" size="default">
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="addModel.name" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="角色备注" prop="remark">
              <el-input v-model="addModel.remark" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog'
import useAddRole from '@/composables/role/useAddRole'
import { ElForm } from 'element-plus'
// 子向父传值
const emits = defineEmits(['save'])
// 表单的ref属性
const addRoleForm = ref<InstanceType<typeof ElForm>>()
// 弹框属性
const { dialog, onClose, onShow } = useDialog()
const { confirm, show, addModel, rules } = useAddRole(dialog, onClose, onShow, addRoleForm, emits)

// 暴露出去，给父组件使用
defineExpose({
  show
})
</script>
<style scoped lang="scss"></style>
