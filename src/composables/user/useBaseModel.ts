import { AddUserModel } from "@/api/user/userModel";
import { reactive } from "vue";

export default function useBaseModel(){
  // 弹框绑定的数据
  const addModel=reactive<AddUserModel>({
    type:'',
    id:'',
    deptId:'',
    deptName:'',
    loginName:'',
    mobile:'',
    nickName:'',
    email:'',
    username:'',
    password:'',
    sex:'',

  })
  // 表单的验证规则
  const rules=reactive({
    deptName:[{
      trigger:'change',
      message:'请选择上级部门',
      required:true

    }],
    loginName:[{
      trigger:'change',
      message:'请填写姓名',
      required:true

    }],
    mobile:[{
      trigger:'change',
      message:'请填写电话',
      required:true

    }],
    username:[{
      trigger:'change',
      message:'请填写登录名',
      required:true

    }],
    password:[{
      trigger:'change',
      message:'请填写密码',
      required:true

    }],
    sex:[{
      trigger:'change',
      message:'请选择性别',
      required:true

    }],

  })
  return {
    addModel,rules
  }
}