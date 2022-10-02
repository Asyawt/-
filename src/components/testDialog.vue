<template>
  <el-button type="primary" size="default" @click="add">新增</el-button>

  <SysDialog :title="dialog.title" :visible="dialog.visible" :width="dialog.width" :height="dialog.height" @onConfirm="onConfirm" @onClose="onClose">
    <template #content>
      <div>这个是测试dialog</div>
    </template>
  </SysDialog>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import SysDialog from './SysDialog.vue'
const dialog = reactive({
  title: '正文',
  visible: false,
  width: 630,
  height: 280
})
const add = () => {
  dialog.visible = true
}
const onClose = () => {
  dialog.visible = false
}
const onConfirm = () => {
  dialog.visible = false
}
</script>
<style scoped lang="scss"></style>
