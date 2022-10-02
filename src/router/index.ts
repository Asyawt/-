import { createRouter, createWebHistory,RouteRecordRaw } from  'vue-router'
import Layout from '@/layout/index.vue'

const routes:Array<RouteRecordRaw>=[
  {
    path:'/dialog',
    component:()=>import('@/components/testDialog.vue')
  },
  {
        path: "/login",
        component: () => import('@/views/login/Login.vue'),
        name: "login",
     
    },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // 这里请求回来的用于渲染的动态路由数据里面没有首页这一项路由的参数配置,因此需要我们手动添加,router.addRoute()就没有添加首页这一项路由
    // 而这项路由数据并不用于展示,因此和展示的路由数据有点差别(有meta项)
    children: [
      {
        path: '/dashboard',
        component: () => import('@/layout/dashboard/index.vue'),
        name: 'dashboard',
        meta: {
          title: '首页',
          icon: '#icondashboard'
        }
      }
    ]
  },
//   #region
// {
//     path: "/system",
//     component: Layout,
//     name: "system",
//     meta: {
//         title: "系统管理",
//         icon: "el-icon-menu",
//         roles: ["sys:manage"],
//         parentId: 0,
//     },
//     children: [
//         {
//             path: "/department",
//             component: () => import('@/views/system/department/department.vue'),
//             name: "department",
//             meta: {
//                 title: "机构管理",
//                 icon: "el-icon-document",
//                 roles: ["sys:dept"]
//             },
//         },
//         {
//             path: "/userList",
//             component: () => import('@/views/system/User/UserList.vue'),
//             name: "userList",
//             meta: {
//                 title: "用户管理",
//                 icon: "el-icon-s-custom",
//                 roles: ["sys:user"]
//             },
//         },
//         {
//             path: "/roleList",
//             component: () => import('@/views/system/Role/RoleList.vue'),
//             name: "roleList",
//             meta: {
//                 title: "角色管理",
//                 icon: "el-icon-s-tools",
//                 roles: ["sys:role"]
//             },
//         },
//         {
//             path: "/menuList",
//             component: () => import('@/views/system/Menu/MenuList.vue'),
//             name: "menuList",
//             meta: {
//                 title: "权限管理",
//                 icon: "el-icon-document",
//                 roles: ["sys:menu"]
//             },
//         },
//     ],
// },
// {
//     path: "/goods",
//     component: Layout,
//     name: "goods",
//     meta: {
//         title: "商品管理",
//         icon: "el-icon-document",
//         roles: ["sys:goods"]
//     },
//     children: [
//         {
//             path: "/goodCategory",
//             component: () => import('@/views/goods/goodsCategory/goodsCategoryList.vue'),
//             name: "goodCategory",
//             meta: {
//                 title: "商品分类",
//                 icon: "el-icon-document",
//                 roles: ["sys:goodsCategory"]
//             },
//         },
//     ],
// },
// {
//     path: "/systenConfig",
//     component: Layout,
//     name: "systenConfig",
//     meta: {
//         title: "系统工具",
//         icon: "el-icon-document",
//         roles: ["sys:systenConfig"]
//     },
//     children: [
//         {
//             path: "/document",
//             component: () => import('@/views/system/config/systemDocument.vue'),
//             name: "http://42.193.158.170:8089/swagger-ui/index.html",
//             meta: {
//                 title: "接口文档",
//                 icon: "el-icon-document",
//                 roles: ["sys:document"]
//             },
//         },
//     ],
// }
// #endregion
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router