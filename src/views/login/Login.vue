<template>
  <div class="logincontainer">
    <el-form class="loginForm" :model="loginModel" ref="loginFormRef" :rules="rules" :inline="false" size="default">
      <el-form-item>
        <div class="loginTitle">系统登录</div>
      </el-form-item>
      <el-form-item label="" prop="username">
        <el-input v-model="loginModel.username" placeholder="请输入账户"></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input v-model="loginModel.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="" prop="code">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input v-model="loginModel.code" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="8">
            <img :src="imgSrc" alt="" @click="getImg" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="">
        <el-row :gutter="20" class="btn">
          <el-col :span="12">
            <el-button type="primary" size="default" style="width: 100%" @click="submitForm(loginFormRef)">登录</el-button>
          </el-col>
          <el-col :span="12">
            <el-button size="default" style="width: 100%">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import useImage from '@/composables/login/userimg'
import loginBaseData from '@/composables/login/userBaseLogindata'
import login from '@/composables/login/userLogin'
// 基础数据
const { loginModel, rules, loginFormRef } = loginBaseData()
// 验证码
const { imgSrc, getImg } = useImage()
// 登录
const { submitForm } = login(loginModel)
</script>
<style scoped lang="scss">
.logincontainer {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginForm {
    width: 400px;
    height: 320px;
    border-radius: 10px;
    padding: 20px 35px;
    box-shadow: 0 0 25px #cac6c6;
    .btn {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 10px;
    }
    .loginTitle {
      width: 100%;
      font-size: 24px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
