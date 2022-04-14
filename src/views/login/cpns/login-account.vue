<template>
  <div class="login_account">
    <el-form
      ref="formRef"
      class="demo-ruleForm"
      label-position="left"
      :model="loginText"
      :rules="loginRules"
    >
      <el-form-item label="账号登录" prop="account">
        <el-input v-model="loginText.account" type="text" />
      </el-form-item>
      <el-form-item label="密&emsp;&emsp;码" prop="password">
        <el-input
          v-model="loginText.password"
          :type="inputType"
          placeholder="Please input password"
          :suffix-icon="iconLogo"
        >
        </el-input>
        <div
          style="
            width: 10px;
            height: 10px;
            margin-rigth: 20px;
            position: relative;
            right: 24px;
            cursor: pointer;
          "
          @click="changeIcon"
        ></div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from "vue";
  import { ElForm } from "element-plus";
  //引入util中的对象实例
  import LocalStorage from "@/util/storage";
  //引入vuex中的useStore
  import { useStore } from "vuex";

  export default defineComponent({
    components: {},
    setup() {
      const loginText = reactive({
        account: LocalStorage.getStorage("account") ?? "",
        password: LocalStorage.getStorage("password") ?? "",
      });
      const iconLogo = ref<string>("Hide");
      const inputType = ref<string>("password");
      //使用store
      const $store = useStore();

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

      //获取formRef
      const formRef = ref<InstanceType<typeof ElForm>>();

      //通过账号密码形式登录的函数
      const accountLogin = (isKeepPassword: boolean) => {
        console.log(formRef.value, "accountLogin正在登录");
        formRef.value?.validate(val => {
          // console.log(val,'fromvalide');
          if (val) {
            console.log("success");
            //isKeepPassword保存密码
            if (isKeepPassword) {
              LocalStorage.setStorage("account", loginText.account);
              LocalStorage.setStorage("password", loginText.password);
              console.log(isKeepPassword, "isKeepPassword");
            } else {
              LocalStorage.deleteStorage("account");
              LocalStorage.deleteStorage("password");
            }
            $store.dispatch("accountLoginAction", {
              name: loginText.account,
              password: loginText.password,
            });
            return true;
          } else {
            return false;
          }
        });
      };

      //修改密码显示与隐藏
      const changeIcon = () => {
        if (iconLogo.value == "Hide") {
          iconLogo.value = "View";
          inputType.value = "text";
        } else {
          iconLogo.value = "Hide";
          inputType.value = "password";
        }
      };
      return {
        loginText,
        loginRules,
        iconLogo,
        inputType,
        accountLogin,
        formRef,
        changeIcon,
      };
    },
  });
</script>

<style scoped lang="less">
  .el-input {
    width: 200px;
  }
</style>
