// 弹框相关功能的操作,因为弹框功能多次使用,可以单独抽离出来
import { DialogModel } from "@/type/BaseType";
import { reactive } from "vue";
export default function useDialog(){
// 弹框的属性
const dialog=reactive<DialogModel>({
title:'',
visible:false,
width:630,
height:280
})
// 展示
const onShow=()=>{
  dialog.visible=true
}
// 关闭
const onClose=()=>{
  dialog.visible=false
}
// 确定
const onConfirm=()=>{
  dialog.visible=false
}
return{
  dialog,
  onShow,
  onClose,
  onConfirm
}
}