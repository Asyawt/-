<template>
  <MenuLogo v-if="!isCollapse" class="layout-logo" :collapsed="isCollapse"></MenuLogo>

  <el-menu router :default-active="path" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#304156" unique-opened>
    <MenuItemVue :menuList="menuList"></MenuItemVue>
  </el-menu>
</template>
<script lang="ts" setup>
import MenuItemVue from './MenuItem.vue'
import MenuLogo from './MenuLogo.vue'
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store/index'
const store = useStore()
const route = useRoute()
// 这里当我们点击进入某个路由组件的时候这时候进入时给路由组件携带的参数
// 和全部信息（和route自带的一些属性）都返回给了父组件的$route中,此时vue3没有
// this.$route,因此用useRoute()
const path = computed(() => {
  return route.path
})
// console.log(path.value)

//菜单数据
const menuList = computed(() => {
  return store.state.menu.menuList
})

// #region
// let menuList = reactive([
//   {
//     path: '/dashboard',
//     component: 'Layout',
//     meta: {
//       title: '首页',
//       icon: 'HomeFilled',
//       roles: ['sys:manage']
//     },
//     children: []
//   },
//   {
//     path: '/system',
//     component: 'Layout',
//     alwaysShow: true,
//     name: 'system',
//     meta: {
//       title: '系统管理',
//       icon: 'Menu',
//       roles: ['sys:manage'],
//       parentId: 0
//     },
//     children: [
//       {
//         path: '/department',
//         component: '/system/department/department',
//         alwaysShow: false,
//         name: 'department',
//         meta: {
//           title: '机构管理',
//           icon: 'DocumentCopy',
//           roles: ['sys:dept'],
//           parentId: 17
//         }
//       },
//       {
//         path: '/userList',
//         component: '/system/User/UserList',
//         alwaysShow: false,
//         name: 'userList',
//         meta: {
//           title: '用户管理',
//           icon: 'User',
//           roles: ['sys:user'],
//           parentId: 17
//         }
//       },
//       {
//         path: '/roleList',
//         component: '/system/Role/RoleList',
//         alwaysShow: false,
//         name: 'roleList',
//         meta: {
//           title: '角色管理',
//           icon: 'Tools',
//           roles: ['sys:role'],
//           parentId: 17
//         }
//       },
//       {
//         path: '/menuList',
//         component: '/system/Menu/MenuList',
//         alwaysShow: false,
//         name: 'menuList',
//         meta: {
//           title: '权限管理',
//           icon: 'CopyDocument',
//           roles: ['sys:menu'],
//           parentId: 17
//         }
//       }
//     ]
//   },
//   {
//     path: '/goods',
//     component: 'Layout',
//     alwaysShow: true,
//     name: 'goods',
//     meta: {
//       title: '商品管理',
//       icon: 'GoodsFilled',
//       roles: ['sys:goods'],
//       parentId: 0
//     },
//     children: [
//       {
//         path: '/goodCategory',
//         component: '/goods/goodsCategory/goodsCategoryList',
//         alwaysShow: false,
//         name: 'goodCategory',
//         meta: {
//           title: '商品分类',
//           icon: 'Goods',
//           roles: ['sys:goodsCategory'],
//           parentId: 34
//         }
//       }
//     ]
//   },
//   {
//     path: '/systenConfig',
//     component: 'Layout',
//     alwaysShow: true,
//     name: 'systenConfig',
//     meta: {
//       title: '系统工具',
//       icon: 'SetUp',
//       roles: ['sys:systenConfig'],
//       parentId: 0
//     },
//     children: [
//       {
//         path: '/document',
//         component: '/system/config/systemDocument',
//         alwaysShow: false,
//         name: 'http://42.193.158.170:8089/swagger-ui/index.html',
//         meta: {
//           title: '接口文档',
//           icon: 'SetUp',
//           roles: ['sys:document'],
//           parentId: 42
//         }
//       }
//     ]
//   }
// ])
// #endregion
//控制菜单展开和关闭
// ref只是让我们定义的变量变成一个响应式数据，但是这样写我们并没有修改他，因此他不会渲染模板
// let isCollapse = ref(store.state.swithIcon)
const isCollapse = computed(() => {
  return store.state.menu.swithIcon
})
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}
/* 这里样式穿透>>>,/deep/,::v-deep,在vue3中建议用:deep */
:deep(.el-sub-menu .el-sub-menu__title) {
  color: #f4f4f5 !important;
}

:deep(.el-menu .el-menu-item) {
  color: #bfcbd9;
}
/* 菜单点中文字的颜色 */

:deep(.el-menu-item.is-active) {
  color: #409eff !important;
}
/* 当前打开菜单的所有子菜单颜色 */

:deep(.is-opened .el-menu-item) {
  background-color: #1f2d3d !important;
}
/* 鼠标移动菜单的颜色 */

:deep(.el-menu-item:hover) {
  background-color: #001528 !important;
}

@keyframes logoAnimation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
.layout-logo {
  animation: logoAnimation 1s ease-out;
}
</style>
