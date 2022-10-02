import { useRouter } from "vue-router"
import { FormInstance } from "element-plus"
import { loginParam } from "@/api/user/userModel"
import { useStore } from "@/store"



// 基础数据
export default function userLogin(loginModel:loginParam){
  const router=useRouter()
  const store=useStore()
  // 先进行表单验证，通过了在发送登录请求
  const submitForm=(formEl:FormInstance | undefined)=>{
    if(!formEl) return
    formEl.validate(async(valid:boolean)=>{
      if(valid){
        // loginApi(loginModel).then((res)=>{
        //   // console.log(res);
      
        // })
        // store.dispatch('user/login',loginModel).then((res)=>{
        //   console.log('登陆成功！');
          
        // })
        try {
       const res=  await store.dispatch('user/login',loginModel)

   
       if(res.data.code==200){
      
        router.push({path:'/'})
    
        
       }
        } catch (error) {
          
        }
      }
    })
  }
 return {
  submitForm
 }
}