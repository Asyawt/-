<template>
  <el-tabs @tab-click="changeTab" v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab">
    <el-tab-pane v-for="item in editableTabs" :key="item.path" :label="item.title" :name="item.path">
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { tabsType } from '@/store/type/tabsType'
import { useStore } from '@/store/index'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useStore()
// 获取tabs数组
const editableTabs = computed(() => {
  return store.getters['tabs/getTabs']
})
// 激活的tabs
const editableTabsValue = ref('')
const getActiceTab = () => {
  editableTabsValue.value = route.path
}
// 添加tabs
const addTab = () => {
  const { path, meta } = route
  const tabs: tabsType = {
    path: path,
    title: meta.title as string
  }
  store.commit('tabs/updateTabArr', tabs)
}
watch(
  () => route.path,
  () => {
    getActiceTab()
    addTab()
  }
)
// 移除tabs
const removeTab = (targetName: string) => {
  if (targetName === '/dashboard') return
  // console.log(targetName)
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab: tabsType, index: number) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }
  editableTabsValue.value = activeName
  // store.getters['tabs/getTabs'] = tabs.filter((tab: tabsType) => tab.path !== targetName) ???????????????????????????????
  store.state.tabs.tabsArr = tabs.filter((tab: tabsType) => tab.path !== targetName)
  router.push({ path: activeName })
}
// 点击切换路由
const changeTab = (tab: any) => {
  // console.log(tab)
  const { props } = tab
  // console.log(props)
  router.push({ path: props.name })
}
// 解决页面刷新，tab重置的问题（对tabs进行缓存
const setTabs = () => {
  // 解决登录不同权限的用户时，tabs栏缓存的是上个用户的tabs
  if (route.path !== '/login') {
    // 这里因为全局在window身上挂载了事件刷新，因此在我们页面跳转的时候（也为刷新，所以会在跳转后会再进行一次本地存储
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('tabsView', JSON.stringify(editableTabs.value))
      let token = sessionStorage.getItem('token')
      localStorage.setItem('xx', token!)
    })
    const oldtabs = localStorage.getItem('tabsView')
    if (localStorage.getItem('xx') == sessionStorage.getItem('token')) {
      // 这里不建议直接操作仓库中的state,建议用mutations，多写一步
      // 能读取到数据才执行赋值
      // store.state.tabsArr = JSON.parse(oldtabs)  ??????????????????????????????????????????????????????????????
      // store.getters['getTabs'] = JSON.parse(oldtabs)
      store.commit('tabs/changeTab', JSON.parse(oldtabs!))
    }
  }
}
onMounted(() => {
  setTabs()
  getActiceTab()
  // addTab()
  console.log(store)
})
</script>
<style scoped lang="scss">
:deep(.el-tabs__header) {
  margin: 0px;
}
:deep(.el-tabs__item) {
  height: 26px !important;
  line-height: 26px !important;
  text-align: center !important;
  border: 1px solid #d8dce5 !important;
  margin: 0px 3px !important;
  color: #495060;
  font-size: 12px !important;
  padding: 0xp 10px !important;
}
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.is-active) {
  border-bottom: 1px solid transparent !important;
  border: 1px solid #42b983 !important;
  background-color: #42b983 !important;
  color: #fff !important;
}
:deep(.el-tabs__item:hover) {
  color: #495060 !important;
}
:deep(.is-active:hover) {
  color: #fff !important;
}
</style>
