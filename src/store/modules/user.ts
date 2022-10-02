import { loginApi,getInfoApi } from "@/api/user/user"
import { loginParam } from "@/api/user/userModel"
import { ActionContext } from "vuex"
import { rootState } from ".."
import { setToken,setUserId,setExpireTime } from "@/utils/auth"


export type UserState={
  token:string,
  userId:string,
  permissions:string[]
}
const state:UserState={
  token:'',
  userId:'',
  permissions:[]
}
const mutations={
  setToken(state:UserState,token:string){
    state.token=token
  },
  setUserId(state:UserState,userId:string){
    state.userId=userId
  },
  setRoles(state:UserState,roles:string[]){
    state.permissions=roles
  }
}
const actions={
  //登录 
//   login({commit}:ActionContext<UserState,rootState>,loginParam:loginParam){
//     return new Promise((resolve,reject)=>{
// // 
// // 
//       loginApi(loginParam).then((res)=>{
//         console.log('111');
        
//         resolve(res)
//       }).catch(error=>{
//         reject(error)
// // 
// // 
//       })
//     })

//   }
 async login({commit}:ActionContext<UserState,rootState>,loginParam:loginParam){
   const res=  await  loginApi(loginParam)
  
   if(res.data.code==200){
    // console.log('登陆成功！');
    // console.log(res); 
    // 把返回回来的token和id存储到仓库中
    commit('setToken',res.data.token)
    commit('setUserId',res.data.id)
    // 把返回回来的token和id和其他一些信息存储到本地仓库中
    setToken(res.data.token)
    setUserId(res.data.id)
    setExpireTime(res.data.expireTime)
   }
   return res
  },
// 获取用户权限信息
async getInfo({commit}:ActionContext<UserState,rootState>){
 const res= await getInfoApi()
//  console.log('111');
//  console.log(res);
//  console.log(res.data.data.roles);
//这里不能用 if(res.data.code==200)因为前面如果用http.instance.get<userInfo>(Api.getInfo)
// 原生的get里的返回的data的类型就必须是传递的<userInfo>类型，而服务器返回给我们的类型是
// code,msg,data:{},不符合<userInfo>参数类型的检测，这里不符合就不符合了，没办法，我们书写的
// 时候就会报错，因为<userInfo>里没有外层的code,这里实际上显示的是服务器返回的数据字段，
// 但我们书写的时候给的提示是以服务器返回的数据为准(？？？是以我们传递的<userInfo>为准)，里面没有code,所以报错，但实际是有的
// 上面说法错误，而是get传递的类型，永远指向的返回的data数据的类型，而不涉及其他外层
//  if(res.data.code==200){
//   commit('setRoles',res.data.roles)
//  }
if(res.code==200){
  console.log('1112');
  
  console.log(res);
  
  commit('setRoles',res.data.roles)
 }
}
}
export const getters={
  getPermissions(state:UserState){
    return state.permissions
  }
}
export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}