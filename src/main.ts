import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { getToken,cleanSession } from './utils/auth'
import resetForm from './utils/resetForm'
import objCopy from './utils/objCopy'
import myconfirm from './utils/myconfirm'
import { permission } from './directives/permission'
//echarts
import * as echarts from 'echarts'
// 解决分页英文的问题
// import locale from 'element-plus/lib/locale/lang/zh-cn' 
// app.use(ElementPlus,{locale})
import locale from 'element-plus/lib/locale/lang/zh-cn' 
// console.log(ElementPlusIconsVue);是一个所有图标的对象
const app=createApp(App)
app.use(router).use(store,key).use(ElementPlus,{locale}).mount('#app')
app.directive('permission',permission)
// 全局挂载工具
app.config.globalProperties.$resetForm=resetForm
app.config.globalProperties.$objCopy=objCopy
app.config.globalProperties.$myconfirm =myconfirm
app.config.globalProperties.$echarts =echarts  
// #region
// const obj={
//   name:'zs',
//   age:13
// }
// type a=typeof obj
// type b=keyof a
// 官方的
for (let [icon,Icons] of Object.entries(ElementPlusIconsVue)) {
  app.component(icon,Icons)
}
// 第三种方法，直接使用
// for (const name in ElementPlusIconsVue){
//   app.component(name,(ElementPlusIconsVue as any)[name])
// }
// #endregion
//第一种方法（需要在ts里面配置，用官方的
// Object.keys(ElementPlusIconsVue).forEach((item)=>{
//   app.component(item,ElementPlusIconsVue[item])
// })
// 路由权限
const whiteList=['/login'] //白名单
router.beforeEach(async(to,from,next)=>{
  const token=getToken()
  if(token){
    if(to.path==='/login' || to.path==='/'){
      next({path:'/'})
    }else{
      // 从vuex里获取菜单
      let hasRoles=store.state.user.permissions && store.state.user.permissions.length>0
      if(hasRoles){
        next()
      }else{
        try {
          // vuex中不存在权限，从服务器获取
        await store.dispatch('user/getInfo')
          // 获取菜单，动态生成路由
        await  store.dispatch('menu/getMenuList',router)
        // 确保动态添加的路由已经全部被完全加载上去
        
        next({...to,replace:true})
        } catch (error) {
          // 当请求用户信息失败时，会走catch这条路，为什么会请求失败，因为当一个用户长久没登录，token值失效了，请求就无效
          // 当请求失败时，要做两件事1）清空本地的token和服务器的token，之前退出登录用过删除token的接口，可以直接调用
          // 2）当请求失败时应该重新回到登陆页面，重新登录
          cleanSession()
          next({path:'/login'})
        }
      }
    }
  }else{
    if(whiteList.indexOf(to.path)!==-1){
      next()
    }else{
      next({path:'/login'})
    }
  }
})