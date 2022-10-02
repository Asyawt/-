<template>
  <SysDialog :title="dialog.title" :visible="dialog.visible" :width="dialog.width" :height="dialog.height" @onClose="onClose" @onConfirm="confirm">
    <template #content>
      <el-form :model="addMenuModel" ref="addMenuForm" :rules="rules" label-width="80px" size="default">
        <el-row>
          <el-col :span="24" :offset="0">
            <el-form-item label="菜单类型" prop="type">
              <el-radio-group v-model="addMenuModel.type">
                <el-radio :label="'0'">目录</el-radio>
                <el-radio :label="'1'">菜单</el-radio>
                <el-radio :label="'2'">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="上级菜单" prop="parentName">
              <el-input v-model="addMenuModel.parentId" type="hidden"></el-input>
              <el-input v-model="addMenuModel.parentName" placeholder="" @click="selectParent" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="菜单名称" prop="label">
              <el-input v-model="addMenuModel.label" placeholder="" @change=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0" v-if="addMenuModel.type != '2'">
            <el-form-item label="菜单图标" prop="icon">
              <el-input v-model="addMenuModel.icon"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0" v-if="addMenuModel.type == '1'">
            <el-form-item label="路由名称" prop="name">
              <el-input v-model="addMenuModel.name" placeholder="" @change=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0" v-if="addMenuModel.type == '1'">
            <el-form-item label="路由地址" prop="path">
              <el-input v-model="addMenuModel.path"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0" v-if="addMenuModel.type == '1'">
            <el-form-item label="组件路径" prop="url">
              <el-input v-model="addMenuModel.url" placeholder="" @change=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="权限字段" prop="code">
              <el-input v-model="addMenuModel.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="菜单序号">
              <el-input v-model="addMenuModel.orderNum" placeholder="" @change=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
  <MenuParent ref="parentRef" @selectNode="select"></MenuParent>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog'
import useAddMenu from '@/composables/menu/useAddMenu'
import MenuParent from './MenuParent.vue'
import useSelectParent from '@/composables/department/useSelectParent'
const emits = defineEmits(['save'])
// 弹框属性
const { dialog, onClose, onShow } = useDialog()
const { confirm, show, addMenuModel, rules, addMenuForm } = useAddMenu(dialog, onClose, onShow, emits)
// 显示上级部门弹框
const { parentRef, selectParent } = useSelectParent()
defineExpose({
  show
})
// 接受子组件收集回来的数据
const select = (data: any) => {
  addMenuModel.parentId = data.id
  addMenuModel.parentName = data.name
  console.log('fu')
  console.log(addMenuModel)
}
</script>
<style scoped lang="scss"></style>
