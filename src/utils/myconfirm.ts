import { ElMessageBox } from "element-plus"


// 信息确定提示框的二次封装
export default function myconfirm(text:string){
return new Promise((resolve,reject)=>{
  ElMessageBox.confirm(
    text,
    '系统提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
  resolve(true)

    })
    .catch(() => {
 reject(false)
    })
}).catch((data) => {
  return data
})
}