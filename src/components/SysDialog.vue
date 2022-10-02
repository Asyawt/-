<template>
  <el-dialog :model-value="props.visible" :title="props.title" :before-close="onClose" :width="width + 'px'" append-to-body>
    <div class="container" :style="{ height: props.height + 'px' }">
      <slot name="content"></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="onClose">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  visible: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 600
  },
  height: {
    type: Number,
    default: 250
  }
})
// 这里defineEmits()返回的是一个函数，触发事件的时候直接调用这个函数
const emits = defineEmits(['onClose', 'onConfirm'])

const onClose = () => {
  emits('onClose')
}
const onConfirm = () => {
  emits('onConfirm')
}
</script>
<style lang="scss">
.container {
  overflow-x: initial;
  overflow-y: auto;
}
.el-dialog {
  border-top-left-radius: 7px !important;
  border-top-right-radius: 7px !important;
  .el-dialog__header {
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    background-color: #1890ff !important;
    margin-right: 0px !important;
    .el-dialog__title {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }
    .el-dialog__close {
      color: #fff;
    }
  }
  .el-dialog__body {
    padding: 10px;
  }
  .el-dialog__footer {
    border-top: 1px solid #e8eaec !important;
    padding: 10px;
  }
}
</style>
