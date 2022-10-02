<template>
  <SysDialog :title="dialog.title" :visible="dialog.visible" :width="dialog.width" :height="dialog.height" @onClose="onClose" @onConfirm="confirm(addDeptForm)">
    <template #content>
      <el-form :model="dialogModel" ref="addDeptForm" :rules="rules" label-width="80px" :inline="true" size="default">
        <el-row>
          <el-col :span="12">
            <el-form-item label="上级部门" size="default" prop="parentName">
              <el-input type="hidden" v-model="dialogModel.pid" size="default"></el-input>
              <el-input v-model="dialogModel.parentName" size="default" @click="selectParent"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称" size="default" prop="name">
              <el-input v-model="dialogModel.name" size="default"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门编码" size="default" prop="deptCode">
              <el-input v-model="dialogModel.deptCode" size="default"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门电话" size="default" prop="deptPhone">
              <el-input v-model="dialogModel.deptPhone" size="default"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门经理" size="default" prop="manager">
              <el-input v-model="dialogModel.manager" size="default"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门地址" size="default" prop="deptAddress">
              <el-input v-model="dialogModel.deptAddress" size="default"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门序号" size="default" prop="orderNum">
              <el-input v-model="dialogModel.orderNum" size="default"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
  <!-- 使用选择上级部门的弹框 -->
  <Parent ref="parentRef" @selectNode="select"></Parent>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog'
import { EditType, Title } from '@/type/BaseEnum'
import Parent from './parent.vue'
import useBaseModel from '@/composables/department/useBaseModel'
import useSelectParent from '@/composables/department/useSelectParent'
import { ElForm, FormInstance } from 'element-plus'
import useInstance from '@/hooks/useInstance'
import { DeptModel } from '@/api/dept/DeptModel'

const { global, proxy } = useInstance()

// 插槽类容的基础属性
let { dialogModel, rules } = useBaseModel()
// 弹框属性和功能
const { dialog, onShow, onClose } = useDialog()
// 获取表单属性，给表单绑定验证规则
const addDeptForm = ref<FormInstance>()
// console.log('12')
// console.log(addDeptForm)
// console.log(proxy)

// 接收声明事件,返回的是一个函数
const emits = defineEmits(['save'])

// 弹框确定
// 这里不用hooks里面的弹框确定,因为当点击确定时我们还需要拿着收集到的数据发送请求
// 而hooks里面的onConfirm只有关闭弹框的操作,因此在这里我们需要重新定义一个方法,添加功能
const confirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 关闭弹框
      onClose()
      // 给父组件传递收集到的新增或编辑的数据,用到自定义事件传值 ,再发送请求
      emits('save', dialogModel)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const show = (type: string, row?: DeptModel) => {
  // 设置弹框标题
  type == EditType.ADD ? (dialog.title = Title.ADD) : (dialog.title = Title.EDIT)
  //  先清空上次表单填写的数据

  // global.$resetForm(addDeptForm.value, dialogModel)这里不用老师之前那样写的了。直接执行下面一句即可实现表单清空
  // addDeptForm.value?.resetFields() ，当我们先点击编辑，再点取消，然后再点新增时，存在数据清空不掉的bug
  // 用nextTick()
  // addDeptForm.value?.resetFields()
  //如果传递了参数，根据这个参数来判断是否需要进行编辑展示的操作

  if (row) {
    // global.$objCopy(row, dialogModel)
    // 也可以用浅拷贝
    nextTick(() => {
      // 这里用nextTick(),是为了让他在首次dom渲染时的dialogModel的初始状态值为空，再数据更新及把row赋值给dialogModel后第二次更新dom页面，
      // 这样就保证了初始状态始终为dialogModel值为空的状态，不会出现先点击编辑，再点取消，然后再点新增时，数据清空不掉的bug，
      // 又保证了点击编辑后有默认的dialogModel值
      Object.assign(dialogModel, row)
    })
    // Object.assign(dialogModel, row)
  }

  // 显示弹框,道理和上面一样,可能会有其他操作(发送请求)
  onShow()
  // 用el清空表单和表单验证的方法，这个方法的作用是清除为初始状态的值(及dialogModel这项数据初次被用来渲染解析模板时的初始状态值，可能为默认定义的空数据，也可能是点击后进行的赋值操作)
  addDeptForm.value?.resetFields()
  //  设置是新增还是编辑
  // 这里相当于是一个收集type属性值的操作，（必须要写在清空表单展示表单之后），写在任意位置都行，表单并没有用到type
  dialogModel.type = type
  // 这里还存在一个小问题，就是我们先进行的是dialogModel.type = type收集了type数据，最后却又清除掉了所有表单数据，最后却发起请求无影响
  // 因为这里表单的收集里面并没有type属性，因此表单的清空操作不会清除掉dialogModel收集数据里面的type的值，所有dialogModel.type = type收集的操作写在任意位置都行
}
// setup语法糖默认是不暴露,没有用setup语法糖默认是全部暴露
// 默认setup的属性只能给当前的template使用,如果要给外界的其他组件使用需要暴露出去
// 显示弹框的功能暴露出去,才能被外部的父组件调用,因为这个是我们自定义的组件,而el的组件是默认暴露的了
defineExpose({
  show
})
// 显示上级部门弹框
const { parentRef, selectParent } = useSelectParent()
// 接受子组件收集回来的数据
const select = (data: any) => {
  dialogModel.pid = data.id
  dialogModel.parentName = data.name
}
</script>
<style scoped lang="scss"></style>
