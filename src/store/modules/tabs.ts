import { tabsType } from "../type/tabsType"
export type TabsState={
  tabsArr:Array<tabsType>
}
export const state:TabsState={
  tabsArr:[]
}
export const mutations={
  updateTabArr(state:TabsState,val:tabsType){
    if(state.tabsArr.some((item)=>item.path===val.path)) return
    state.tabsArr.push(val)
  },
  changeTab(state:TabsState,val:Array<tabsType>){
 state.tabsArr=val
  }
}
export const actions={}

export const getters={
  getTabs(state:TabsState){
    return state.tabsArr
  }
}
export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}