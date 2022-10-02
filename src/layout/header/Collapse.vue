<template>
  <el-icon class="icon" @click="changeIcon">
    <component :is="swithIcon ? Expand : Fold"></component>
  </el-icon>
</template>
<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue'
import { useStore } from '@/store/index'
const store = useStore()
// let swithIcon = ref(store.state.swithIcon)
// const changeIcon = () => {
//   swithIcon.value = !swithIcon.value
//   store.commit('updateIcon', swithIcon.value)
// }
const swithIcon = computed(() => {
  return store.state.menu.swithIcon
})
const changeIcon = () => {
  store.commit('menu/updateIcon', !swithIcon.value)
}
</script>
<style scoped lang="scss">
.icon {
  font-size: 24px;
  color: #303133;
  cursor: pointer;
  margin-right: 15px;
}
</style>
