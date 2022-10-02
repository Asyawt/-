<template>
  <div class="logo">
    <img :src="logo" alt="logo" />
    <span v-if="show" class="title">{{ title }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true
  }
})
// 控制文字的显示与隐藏
const show = ref(true)
const logo = ref('https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png')
const title = ref('Vue3+TypeScript实战')
watch(
  () => props.collapsed,
  (collapsed: Boolean) => {
    if (!collapsed) {
      setTimeout(() => {
        show.value = !collapsed
      }, 500)
    } else {
      show.value = !collapsed
    }
  }
)
</script>

<style lang="scss" scoped>
.logo {
  background-color: #2b2f3a;
  height: 50px;
  border: none;
  line-height: 50px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  color: #fff;
  img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }
  span {
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
}
</style>
