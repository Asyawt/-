<template>
  <div class="header">
    <Collaps></Collaps>
    <BredCumVue></BredCumVue>
  </div>
  <UserInfo></UserInfo>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import Collaps from './Collapse.vue'
import BredCumVue from './BredCum.vue'
import UserInfo from './UserInfo.vue'
</script>
<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
}
</style>
