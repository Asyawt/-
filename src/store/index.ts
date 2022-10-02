// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import {tabsType} from './type/tabsType'
import tabs,{TabsState} from './modules/tabs'
import menu,{MenuState} from './modules/menu'
import user,{UserState} from './modules/user'

// export interface State {
//   swithIcon:boolean,
//   tabsArr:Array<tabsType>
// }
export type rootState={
  tabs:TabsState,
  menu:MenuState,
  user:UserState
}
// export interface rootState {
//   tabs:TabsState,
//   menu:MenuState
// }

const modules={
tabs,
menu,
user
}

export const key: InjectionKey<Store<rootState>> = Symbol()

export const store = createStore<rootState>({
modules
// #region
  // state: {
  //   swithIcon:false,
  //   tabsArr:[]
    
  // },
  // mutations:{  
  //   updateIcon(state:State,val:boolean){
  //     state.swithIcon=val
  //   },
  //   updateTabArr(state:State,val:tabsType){
  //     if(state.tabsArr.some((item)=>item.path===val.path)) return
  //     state.tabsArr.push(val)
  //   }
  // },
  // getters:{
  //   getSwithIcon(state:State){
  //     return state.swithIcon
  //   },
  //   getTabsArr(state:State){
  //     return state.tabsArr
  //   }
  // }
// #endregion
 
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}