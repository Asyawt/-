<template>
  <SysDialog :title="dialog.title" :width="dialog.width" :visible="dialog.visible" :height="dialog.height" @onClose="onClose" @onConfirm="confirm">
    <template #content>
      <el-tree :default-checked-keys="assignTreeData.assignTreeChecked" ref="assignTree" :data="assignTreeData.list" node-key="id" :props="defaultProps" empty-text="暂无数据" :show-checkbox="true" :highlight-current="true" default-expand-all></el-tree>
    </template>
  </SysDialog>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog'
import useAssignMenu from '@/composables/role/useAssignMenu'
const { dialog, onClose, onShow } = useDialog()
const { confirm, show, assignTreeData, defaultProps, assignTree } = useAssignMenu(dialog, onClose, onShow)
defineExpose({
  show
})
</script>
<style scoped lang="scss"></style>
