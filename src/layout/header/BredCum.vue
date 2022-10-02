<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }" v-for="item in tabs">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
const route = useRoute()

const getBredCum = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  if (matched[0] && matched[0].path !== '/dashboard') {
    matched = [{ path: '/dashboard', meta: { title: '首页' } } as any].concat(matched)
  }
  let tabs = matched
  return tabs
}
// let tabs = reactive(getBredCum())
const tabs = computed(() => {
  return getBredCum()
})
watch(
  () => route.path,
  () => getBredCum()
)
</script>
<style scoped lang="scss"></style>
