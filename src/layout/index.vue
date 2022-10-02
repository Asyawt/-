<template>
  <el-container class="layout">
    <el-aside class="asside" width="auto">
      <MenuBar />
    </el-aside>
    <el-container class="layout">
      <el-header class="header">
        <Header />
      </el-header>
      <el-main class="main">
        <Tabs style="padding: 0 20px"></Tabs>

        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
// #region
// import { ref, defineComponent } from 'vue'
// export default defineComponent({
//   name: 'Home'
// })
// import { ref, defineProps } from 'vue'
// const count = ref(0);
// const props = defineProps({
//   msg: {
//     type: String,
//     required: true,
//   },
// });
// #endregion
import Header from './header/Header.vue'
import MenuBar from './menu/MenuBar.vue'
import Tabs from './tabs/Tab.vue'
</script>

<style lang="scss" scoped>
// .ani-enter-from {
//   opacity: 0;
// }
// .ani-enter-to {
//   opacity: 1;
// }
// .ani-enter-active,
// .ani-leave-active {
//   transition: all 1s linear;
// }
.layout {
  height: 100%;
  .asside {
    background-color: rgb(48, 65, 86);
  }
  .header {
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .main {
    padding-top: 0px;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
</style>
