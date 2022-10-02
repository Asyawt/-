export default function resetForm(formRef:any,obj:any){
  // 清空数据
  Object.keys(obj).forEach((key)=>{
    obj[key]=''
  })
  // 清除表单的验证,一般执行下面两行代码就可以清空了，但有特殊情况下面两行不能清空，加上上面的就可以了
  if(formRef){
    // 	重置字段并删除验证结果
    formRef.resetFields()
    // 删除字段的验证状态。
    formRef.clearValidate()
  }
}