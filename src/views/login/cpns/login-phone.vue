<template>
  <div class="login_account">
    <el-form
      ref="ruleFormRef"
      class="demo-ruleForm"
      label-position="left"
      :model="loginText"
      :rules="loginRules"
    >
      <el-form-item label="手机号" prop="telPhone">
        <el-input v-model="loginText.telPhone" type="text" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="loginText.code" type="text" class="input2" />
        <el-button type="primary" style="width: 90px; margin-left: 10px"
          >获取验证码</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const loginText = reactive({
      telPhone: "",
      code: "",
    });
    //通过手机验证码形式登录的函数
   const phoneLogin=()=>{
      console.log('机验证码形');

   }

    //验证规则
    //#region
    const loginRules = reactive({
      account: [
        { required: true, message: "请输入账号", trigger: "blur" },
        {
          min: 3,
          max: 10,
          message: "用户名必需是3-10位的数字或字母",
          trigger: "blur",
        },
        // {
        //   pattern: /^[a-z0-9]{5,10}$/,
        //   message: "用户名必需是5-10位的数字或字母",
        //   trigger: "blur",
        // },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" },
      ],
    });
    //#endregion

    return {
    loginText,
    loginRules,
    phoneLogin
    };
  },
});
</script>

<style scoped lang="less">
.el-input {
  width: 200px;
}
.input2 {
  width: 100px;
}
</style>
