import { getMenuListApi } from "@/api/menu/menu"
import { RouteRecordRaw } from "vue-router"
import { ActionContext } from "vuex"
import { rootState } from ".."
import Layout from '@/layout/index.vue'
// vite专有方法,把对应的所有模块导入进来，使用的时候用对象的形式
// 值得形式为const modules = {
//   '../../views/**/*.vue': () => import('../../views/**/*.vue'),
// }
const modules=import.meta.glob('../../views/**/*.vue')
export type MenuState={
  swithIcon:boolean,
  menuList:any
}
export const state:MenuState={
  swithIcon:false,
  menuList:[
    {
      path: '/dashboard',
      component: "Layout",
      meta: {
          title: "首页",
          icon: "HomeFilled",
          roles: ["sys:manage"]
      },
      children: []
  }
  ]
}
export const mutations={
  updateIcon(state:MenuState,val:boolean){
    state.swithIcon=val
  },
  setMenuList(state:MenuState,menuList:Array<RouteRecordRaw>){
    state.menuList=state.menuList.concat(menuList)
  }
}
export const actions={
 async getMenuList({commit}:ActionContext<MenuState,rootState>,router:any){
  const res=  await getMenuListApi()
  console.log('1113');
  
  console.log(res);
  
  let accessedRoutes
  if(res.code==200){
    // 这里请求动态路由数据成功后，我们总的有两个任务
    // 1.首先要对返回的数据进行路由的component处理，再在我们的router里面动态添加路由也就是router.addRoute()，只有动态添加了路由这样才能跳转
    // 2.我们是利用动态路由数据进行的菜单渲染,因此还需要把这个数据存到仓库,一边渲染时使用
    // 动态生成添加路由（进行数据处理
     accessedRoutes=filterAsyncRoutes(res.data,router)
    //  把处理后的数据存放到仓库
  
   commit('setMenuList',accessedRoutes)
  }
  // 对进行了数据处理的路由菜单数据进行返回
  return accessedRoutes
  }
}
// 对返回的路由菜单数据进行处理
export function filterAsyncRoutes(routes:RouteRecordRaw[],router:any){
  const res:Array<RouteRecordRaw>=[]
  routes.forEach((route:any)=>{
    res.push(route)
    if(route.component){
      if(route.component=='Layout'){
        route.component=Layout
      }else{
        route.component=modules[`../../views${route.component}.vue`]
      }
    }
    if(route.children){
      // 递归
      route.children=filterAsyncRoutes(route.children,router)
    }
    // 这里数据处理的结果route是用于路由导航用的因此需要处理后的数据router.addRoute(route)
    router.addRoute(route)
    // 而这里的res.push(route)是用于渲染页面菜单的数据,不需要进行数据处理也可以直接使用,因为渲染过程中没有用到component
    // res.push(route)
  })
  return res
}
export const getters={
  getSwithIcon(state:MenuState){
    return state.swithIcon
  },
  getMenuLsit(state:MenuState){
    return state.menuList

  }
}
export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}