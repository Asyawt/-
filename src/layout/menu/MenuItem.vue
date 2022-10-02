<template>
  <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length > 0" :key="menu.path">
      <template #title>
        <!-- <i :class="menu.meta.icon"></i> -->
        <component class="icons" :is="menu.meta.icon"></component>
        <span>{{ menu.meta.title }}</span>
      </template>
      <menu-item :menuList="menu.children"></menu-item>
    </el-sub-menu>
    <el-menu-item :index="menu.path" style="color: #f4f4f5" v-else>
      <component class="icons" :is="menu.meta.icon"></component>
      <template #title>
        {{ menu.meta.title }}
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
defineProps(['menuList'])
</script>

<style scoped>
.icons {
  width: 24px;
  height: 18px;
  margin-right: 5px;
}
</style>
