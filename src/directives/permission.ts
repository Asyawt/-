// 自定义按钮权限指令
import {Directive} from 'vue'
import {store} from '@/store/index'
export const permission:Directive={
  mounted(el,binding){
    // value:按钮上的权限
    const {value}=binding
    // 获取用户所有的权限
    const permissions=store.getters['user/getPermissions']
    // 判断传递进来的按钮权限，是否存在
    if(value && value instanceof Array && value.length>0){
      // 判断传递进来的按钮权限字段（这个权限是当前按钮字段的权限，是否存在当前用户的permissions，如果用户有，则显示
    const hasPermission=permissions.some((item)=>{
      return value.includes(item)
    })
    if(!hasPermission){
      el.style.display='none'
    }
    }else{
      throw new Error('need roles! Like v-permission="[\'add\',\'edit\']"')
    }
  }
}