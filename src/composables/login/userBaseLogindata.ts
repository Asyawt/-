import { reactive,ref} from "vue";
import { loginParam } from "@/api/user/userModel";
import type { ElForm, FormRules } from 'element-plus'
export default function loginBaseData(){
  // 获取内部el-form组件实例
const loginFormRef=ref<InstanceType<typeof ElForm>>()
  // 绑定的数据
  const loginModel=reactive<loginParam>({
    username:'',
    password:'',
    code:'',
  })
  // 校验规则
  const rules = reactive<FormRules>({
    username:[{
      required:true,
      trigger:'change',
      message:'请输入用户名'
    }],
    password:[{
      required:true,
      trigger:'change',
      message:'请输入密码'
    }],
    code:[{
      required:true,
      trigger:'change',
      message:'请输入验证码'
    }]
  })
return {
  loginModel,
  rules,
  loginFormRef
}
}