
import axios,{AxiosInstance,AxiosRequestConfig,AxiosPromise,AxiosResponse} from 'axios'
import { ElMessage } from 'element-plus'
import { loginParam,loginResult } from '@/api/user/userModel'
import {cleanSession, getToken} from '@/utils/auth'
import qs from 'qs'


export interface Result<T=any>{
  code:number,
  msg:string,
  data:T
}
enum StatusCode{
  NoAuth=600,
  Success=200
}
class request{
  instance:AxiosInstance;
  constructor(config:AxiosRequestConfig){
    this.instance=axios.create(config)
    this.interceptors()
  
  }

  private interceptors(){
    // 请求拦截器
    this.instance.interceptors.request.use((config:AxiosRequestConfig)=>{
      let token=getToken()
      if(token){
        // 这里请求头部进行了赋值操作，需要把之前已有的请求头部配置一起加到里面
        config.headers={
          // 'Content-Type':'application/json',
          ...config.headers,
          token:token
        }
        
      }
      return config;
    },(error:any)=>{
             // 错误抛到业务代码
             error.data = {}
             error.data.msg = '服务器异常，请联系管理员！'
             return error

    })

    // 响应拦截器
    this.instance.interceptors.response.use((res:AxiosResponse)=>{
      console.log(res);
      
      if(res && res.data){
        const data=res.data
        if(data.code==StatusCode.NoAuth){
        
          // 跳转到登录
          window.location.href='/login'
            //token过期
            cleanSession()
        }else if(data.code==StatusCode.Success || res.config.responseType==='arraybuffer'){
          return res
        }else{
          ElMessage.error(data.msg || '服务器出错！' )
          return res || null
        }
      }

    },(error) => { // 这里是遇到报错的回调
      console.log('进入错误')
      error.data = {};
      if (error && error.response) {
          switch (error.response.status) {
              case 400:
                  error.data.msg = '错误请求';
                  ElMessage.error(error.data.msg)
                  break
              case 401:
                  error.data.msg = '未授权，请重新登录';
                  ElMessage.error(error.data.msg)
                  break
              case 403:
                  error.data.msg = '拒绝访问';
                  ElMessage.error(error.data.msg)
                  break
              case 404:
                  error.data.msg = '请求错误,未找到该资源';
                  ElMessage.error(error.data.msg)
                  break
              case 405:
                  error.data.msg = '请求方法未允许';
                  ElMessage.error(error.data.msg)
                  break
              case 408:
                  error.data.msg = '请求超时';
                  ElMessage.error(error.data.msg)
                  break
              case 500:
                  error.data.msg = '服务器端出错';
                  ElMessage.error(error.data.msg)
                  break
              case 501:
                  error.data.msg = '网络未实现';
                  ElMessage.error(error.data.msg)
                  break
              case 502:
                  error.data.msg = '网络错误';
                  ElMessage.error(error.data.msg)
                  break
              case 503:
                  error.data.msg = '服务不可用';
                  ElMessage.error(error.data.msg)
                  break
              case 504:
                  error.data.msg = '网络超时';
                  ElMessage.error(error.data.msg)
                  break
              case 505:
                  error.data.msg = 'http版本不支持该请求';
                  ElMessage.error(error.data.msg)
                  break
              default:
                  error.data.msg = `连接错误${error.response.status}`;
                  ElMessage.error(error.data.msg)
          }
      } else {
          error.data.msg = "连接到服务器失败";
          ElMessage.error(error.data.msg)
      }
      // return Promise.reject(error)
      return error
  })
  }
// 基础请求
// ***
// !!!!! <T=any>和:Promise<Result<T>> 仅仅是书写时起到提示作用！！！
getParms(parms:any):string{
  let _params=''
  if(Object.is(parms,undefined || null)){
    _params=''
  }else{
    for(const key in parms){
      if(parms.hasOwnProperty(key)&& parms[key]){
        _params+=`${parms[key]}/`
      }
    }
  }
  if (_params) _params=_params.substr(0,_params.length-1)
  return _params
}
get<T=any>(url:string,parms?:any):Promise<Result<T>>{
  return new Promise((resolve,reject)=>{
    this.instance.get<T>(url,{
      params:parms,
      paramsSerializer:(parms)=>{
        return qs.stringify(parms)
      }
    }).then((res)=>{
      resolve(res.data as any)
    }).catch((error)=>{
      reject(error)
    })
  })
}
getRestApi<T=any>(url:string,parms?:any):Promise<Result<T>>{
  return new Promise((resolve,reject)=>{
    this.instance.get<T>(this.getParms(parms)?`${url}/${this.getParms(parms)}`:url).then((res)=>{
      resolve(res.data as any)
    }).catch((error)=>{
      reject(error)
    })
  })
}
post<T=any>(url:string,data?:any):Promise<Result<T>>{
  return new Promise((resolve,reject)=>{
    this.instance.post<T>(url,data,{
      transformRequest:[(params)=>{
        return JSON.stringify(params)
      }],
      headers:{
        'Content-Type':'application/json'
      }
    }).then((res)=>{
      resolve(res.data as any)
    }).catch((error)=>{
      reject(error)
    })
  })
}
put<T=any>(url:string,data?:any):Promise<Result<T>>{
 return new Promise((resolve,reject)=>{
  this.instance.put<T>(url,data,{
    transformRequest:[(params)=>{
      return JSON.stringify(params)
    }],
    headers:{
      'Content-Type':'application/json'
    }
  }).then((res)=>{
    resolve(res.data as any)
  }).catch((error)=>{
    reject(error)
  })
 })
}
delete<T = any>(url: string, parms: any): Promise<Result<T>> {
  return new Promise((resolve, reject) => {
      this.instance.delete<T>(this.getParms(parms) ? `${url}/${this.getParms(parms)}` : url)
          .then((res) => {
              resolve(res.data as any)
          }).catch((error) => {
              reject(error)
          })
  })
}
// 请求验证码图片
  getImage(url: string) {
    return this.instance.post(url, null, {
        responseType: 'arraybuffer'
    })
}
// 登录
// 这里的Promise<Result<T>>是为axios的第一层包裹（即原本的axios请求，他给我们包裹的）里面本身有的data
// 即res.data里面的数据再进行一次数据包裹（即我们二次封装的axios的get的:Promise<Result<T>>）
// 里面的字段有Result里定义的字段，而返回的真实数据在data里，即为T传入的字段

login<T=any>(url:string,params:loginParam):Promise<Result<T>>{
  return new Promise((resolve,reject)=>{
    this.instance.post<T>(url,params,{
      transformRequest:[(params)=>{
        return qs.stringify(params)
      }],
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      resolve(res as any)
    }).catch((error)=>{
      reject(error)
    })
  })
}
}
export default request;