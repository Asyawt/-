enum  Keys{
  Token='token',
  UserId='userId',
  ExpireTime = 'expireTime'
}
// 存储到本地仓库token
export const setToken=(token:string)=>{
  sessionStorage.setItem(Keys.Token,token)
}
export const getToken=()=>{
 return sessionStorage.getItem(Keys.Token)
}
// 存储id
export const setUserId=(id:number)=>{
sessionStorage.setItem(Keys.UserId,JSON.stringify(id))
}
export const getUserId=()=>{
 return sessionStorage.getItem(Keys.UserId)
}
// 存储过期时间
export const setExpireTime = (time:number)=>{
  sessionStorage.setItem(Keys.ExpireTime,JSON.stringify(time))
}
export const getExpireTime = ()=>{
  return sessionStorage.getItem(Keys.ExpireTime)
}
// 清空sessionStorage
export const cleanSession=()=>{
  sessionStorage.clear()
}